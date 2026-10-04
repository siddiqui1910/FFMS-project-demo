from rest_framework import serializers
from .models import (
    Pond, Species, Batch, FingerlingStocking,
    FeedInventory, FeedConsumption, MortalityRecord,
    WaterQuality, SecurityIncident, Worker,
    Attendance, Expense, Harvest, Buyer, Sale, Auction,
)


# ============================================================
# 1. POND
# ============================================================
class PondSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pond
        fields = '__all__'


# ============================================================
# 2. SPECIES
# ============================================================
class SpeciesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Species
        fields = '__all__'


# ============================================================
# 3. BATCH
# ============================================================
class BatchSerializer(serializers.ModelSerializer):
    pond_name = serializers.CharField(source='pond.name', read_only=True)
    species_name = serializers.CharField(source='species.name', read_only=True)

    class Meta:
        model = Batch
        fields = '__all__'


# ============================================================
# 4. FINGERLING STOCKING
# ============================================================
class FingerlingStockingSerializer(serializers.ModelSerializer):
    batch_display = serializers.CharField(source='batch.__str__', read_only=True)

    class Meta:
        model = FingerlingStocking
        fields = '__all__'


# ============================================================
# 5. FEED INVENTORY
# ============================================================
class FeedInventorySerializer(serializers.ModelSerializer):
    class Meta:
        model = FeedInventory
        fields = '__all__'


# ============================================================
# 6. FEED CONSUMPTION
# ============================================================
class FeedConsumptionSerializer(serializers.ModelSerializer):
    pond_name = serializers.CharField(source='pond.name', read_only=True)

    class Meta:
        model = FeedConsumption
        fields = '__all__'


# ============================================================
# 7. MORTALITY RECORD
# ============================================================
class MortalityRecordSerializer(serializers.ModelSerializer):
    batch_display = serializers.CharField(source='batch.__str__', read_only=True)

    class Meta:
        model = MortalityRecord
        fields = '__all__'


# ============================================================
# 8. WATER QUALITY
# ============================================================
class WaterQualitySerializer(serializers.ModelSerializer):
    pond_name = serializers.CharField(source='pond.name', read_only=True)

    class Meta:
        model = WaterQuality
        fields = '__all__'


# ============================================================
# 9. SECURITY INCIDENT
# ============================================================
class SecurityIncidentSerializer(serializers.ModelSerializer):
    pond_name = serializers.CharField(source='pond.name', read_only=True)

    class Meta:
        model = SecurityIncident
        fields = '__all__'


# ============================================================
# 10. WORKER
# ============================================================
class WorkerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Worker
        fields = '__all__'


# ============================================================
# 11. ATTENDANCE
# ============================================================
class AttendanceSerializer(serializers.ModelSerializer):
    worker_name = serializers.CharField(source='worker.name', read_only=True)

    class Meta:
        model = Attendance
        fields = '__all__'


# ============================================================
# 12. EXPENSE
# ============================================================
class ExpenseSerializer(serializers.ModelSerializer):
    batch_display = serializers.CharField(source='batch.__str__', read_only=True, allow_null=True)

    class Meta:
        model = Expense
        fields = '__all__'


# ============================================================
# 13. HARVEST
# ============================================================
class HarvestSerializer(serializers.ModelSerializer):
    batch_display = serializers.CharField(source='batch.__str__', read_only=True)

    class Meta:
        model = Harvest
        fields = '__all__'


# ============================================================
# 14. BUYER
# ============================================================
class BuyerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Buyer
        fields = '__all__'


# ============================================================
# 15. SALE
# ============================================================
class SaleSerializer(serializers.ModelSerializer):
    buyer_name = serializers.CharField(source='buyer.name', read_only=True)
    harvest_display = serializers.CharField(source='harvest.__str__', read_only=True)

    class Meta:
        model = Sale
        fields = '__all__'


# ============================================================
# 16. AUCTION
# ============================================================
class AuctionSerializer(serializers.ModelSerializer):
    sale_display = serializers.CharField(source='sale.__str__', read_only=True)

    class Meta:
        model = Auction
        fields = '__all__'