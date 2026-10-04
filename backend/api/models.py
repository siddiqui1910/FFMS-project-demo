from django.db import models
from django.contrib.auth.models import User


# ============================================================
# 1. POND
# ============================================================
class Pond(models.Model):
    STATUS_CHOICES = [
        ('Active', 'Active'),
        ('Inactive', 'Inactive'),
        ('Maintenance', 'Maintenance'),
    ]
    name = models.CharField(max_length=100, unique=True)
    size_acres = models.DecimalField(max_digits=8, decimal_places=2)
    water_source = models.CharField(max_length=200, default='Indus River')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Active')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']


# ============================================================
# 2. SPECIES
# ============================================================
class Species(models.Model):
    name = models.CharField(max_length=50, unique=True)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = 'Species'
        ordering = ['name']


# ============================================================
# 3. BATCH
# ============================================================
class Batch(models.Model):
    STATUS_CHOICES = [
        ('Stocked', 'Stocked'),
        ('Growing', 'Growing'),
        ('Harvested', 'Harvested'),
    ]
    pond = models.ForeignKey(Pond, on_delete=models.CASCADE, related_name='batches')
    species = models.ForeignKey(Species, on_delete=models.PROTECT, related_name='batches')
    stocking_date = models.DateField()
    quantity = models.IntegerField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Stocked')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Batch #{self.id} - {self.species.name} in {self.pond.name}"

    class Meta:
        ordering = ['-stocking_date']


# ============================================================
# 4. FINGERLING STOCKING
# ============================================================
class FingerlingStocking(models.Model):
    batch = models.ForeignKey(Batch, on_delete=models.CASCADE, related_name='stockings')
    supplier = models.CharField(max_length=100, blank=True, null=True)
    quantity = models.IntegerField()
    cost = models.DecimalField(max_digits=12, decimal_places=2)
    date = models.DateField()

    def __str__(self):
        return f"Stocking #{self.id} for {self.batch}"

    class Meta:
        ordering = ['-date']


# ============================================================
# 5. FEED INVENTORY
# ============================================================
class FeedInventory(models.Model):
    delivery_date = models.DateField()
    quantity_kg = models.DecimalField(max_digits=10, decimal_places=2)
    supplier = models.CharField(max_length=100, blank=True, null=True)
    cost = models.DecimalField(max_digits=12, decimal_places=2)

    def __str__(self):
        return f"Feed delivery {self.delivery_date} - {self.quantity_kg}kg"

    class Meta:
        verbose_name_plural = 'Feed Inventory'
        ordering = ['-delivery_date']


# ============================================================
# 6. FEED CONSUMPTION
# ============================================================
class FeedConsumption(models.Model):
    pond = models.ForeignKey(Pond, on_delete=models.CASCADE, related_name='feed_consumptions')
    feed = models.ForeignKey(FeedInventory, on_delete=models.SET_NULL, null=True, blank=True)
    date = models.DateField()
    quantity_kg = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"Feed {self.date} - {self.pond.name}"

    class Meta:
        ordering = ['-date']


# ============================================================
# 7. MORTALITY RECORD
# ============================================================
class MortalityRecord(models.Model):
    batch = models.ForeignKey(Batch, on_delete=models.CASCADE, related_name='mortalities')
    date = models.DateField()
    count = models.IntegerField()
    cause = models.CharField(max_length=200, blank=True, null=True)

    def __str__(self):
        return f"Mortality {self.date} - {self.count} fish"

    class Meta:
        ordering = ['-date']


# ============================================================
# 8. WATER QUALITY
# ============================================================
class WaterQuality(models.Model):
    FLOW_CHOICES = [
        ('Flowing', 'Flowing'),
        ('Stagnant', 'Stagnant'),
    ]
    pond = models.ForeignKey(Pond, on_delete=models.CASCADE, related_name='water_qualities')
    date = models.DateField()
    ph_level = models.DecimalField(max_digits=4, decimal_places=2, null=True, blank=True)
    flow_status = models.CharField(max_length=20, choices=FLOW_CHOICES, default='Flowing')
    ammonia_level = models.DecimalField(max_digits=6, decimal_places=2, null=True, blank=True)
    remarks = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Water {self.date} - {self.pond.name}"

    class Meta:
        verbose_name_plural = 'Water Quality'
        ordering = ['-date']


# ============================================================
# 9. SECURITY INCIDENT
# ============================================================
class SecurityIncident(models.Model):
    TYPE_CHOICES = [
        ('Theft', 'Theft'),
        ('Bird Attack', 'Bird Attack'),
        ('Other', 'Other'),
    ]
    pond = models.ForeignKey(Pond, on_delete=models.CASCADE, related_name='incidents')
    date = models.DateField()
    type = models.CharField(max_length=30, choices=TYPE_CHOICES)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.type} - {self.date}"

    class Meta:
        ordering = ['-date']


# ============================================================
# 10. WORKER
# ============================================================
class Worker(models.Model):
    name = models.CharField(max_length=100)
    role = models.CharField(max_length=50, default='Laborer')
    phone = models.CharField(max_length=20, blank=True, null=True)
    wage_rate = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.role})"

    class Meta:
        ordering = ['name']


# ============================================================
# 11. ATTENDANCE
# ============================================================
class Attendance(models.Model):
    STATUS_CHOICES = [
        ('Present', 'Present'),
        ('Absent', 'Absent'),
        ('Leave', 'Leave'),
    ]
    worker = models.ForeignKey(Worker, on_delete=models.CASCADE, related_name='attendances')
    date = models.DateField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Present')

    def __str__(self):
        return f"{self.worker.name} - {self.date} ({self.status})"

    class Meta:
        ordering = ['-date']
        unique_together = ('worker', 'date')


# ============================================================
# 12. EXPENSE
# ============================================================
class Expense(models.Model):
    CATEGORY_CHOICES = [
        ('Feed', 'Feed'),
        ('Labor', 'Labor'),
        ('Transport', 'Transport'),
        ('Guard', 'Guard'),
        ('Medicine', 'Medicine'),
        ('Misc', 'Misc'),
    ]
    category = models.CharField(max_length=30, choices=CATEGORY_CHOICES)
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    date = models.DateField()
    description = models.TextField(blank=True, null=True)
    batch = models.ForeignKey(Batch, on_delete=models.SET_NULL, null=True, blank=True, related_name='expenses')

    def __str__(self):
        return f"{self.category} - {self.amount}"

    class Meta:
        ordering = ['-date']


# ============================================================
# 13. HARVEST
# ============================================================
class Harvest(models.Model):
    TYPE_CHOICES = [
        ('Full', 'Full'),
        ('Partial', 'Partial'),
    ]
    GRADE_CHOICES = [
        ('A', 'A'),
        ('B', 'B'),
        ('C', 'C'),
    ]
    batch = models.ForeignKey(Batch, on_delete=models.CASCADE, related_name='harvests')
    date = models.DateField()
    total_weight_kg = models.DecimalField(max_digits=10, decimal_places=2)
    grade = models.CharField(max_length=5, choices=GRADE_CHOICES, default='A')
    type = models.CharField(max_length=10, choices=TYPE_CHOICES, default='Full')

    def __str__(self):
        return f"Harvest {self.date} - {self.total_weight_kg}kg"

    class Meta:
        ordering = ['-date']


# ============================================================
# 14. BUYER
# ============================================================
class Buyer(models.Model):
    name = models.CharField(max_length=100)
    market_location = models.CharField(max_length=200, default='Thatta Fish Market')
    phone = models.CharField(max_length=20, blank=True, null=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']


# ============================================================
# 15. SALE
# ============================================================
class Sale(models.Model):
    PAYMENT_STATUS = [
        ('Paid', 'Paid'),
        ('Pending', 'Pending'),
    ]
    harvest = models.ForeignKey(Harvest, on_delete=models.CASCADE, related_name='sales')
    buyer = models.ForeignKey(Buyer, on_delete=models.PROTECT, related_name='purchases')
    weight_kg = models.DecimalField(max_digits=10, decimal_places=2)
    rate_per_kg = models.DecimalField(max_digits=10, decimal_places=2)
    total_amount = models.DecimalField(max_digits=14, decimal_places=2)
    date = models.DateField()
    payment_status = models.CharField(max_length=20, choices=PAYMENT_STATUS, default='Paid')

    def __str__(self):
        return f"Sale #{self.id} - {self.total_amount}"

    class Meta:
        ordering = ['-date']


# ============================================================
# 16. AUCTION
# ============================================================
class Auction(models.Model):
    sale = models.OneToOneField(Sale, on_delete=models.CASCADE, related_name='auction')
    highest_bid = models.DecimalField(max_digits=14, decimal_places=2)
    bidder_name = models.CharField(max_length=100)
    auction_date = models.DateField()

    def __str__(self):
        return f"Auction for Sale #{self.sale.id}"

    class Meta:
        ordering = ['-auction_date']