from django.contrib import admin
from .models import (
    Pond, Species, Batch, FingerlingStocking,
    FeedInventory, FeedConsumption, MortalityRecord,
    WaterQuality, SecurityIncident, Worker,
    Attendance, Expense, Harvest, Buyer, Sale, Auction,
)


@admin.register(Pond)
class PondAdmin(admin.ModelAdmin):
    list_display = ('name', 'size_acres', 'water_source', 'status')
    list_filter = ('status',)
    search_fields = ('name',)


@admin.register(Species)
class SpeciesAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)


@admin.register(Batch)
class BatchAdmin(admin.ModelAdmin):
    list_display = ('id', 'pond', 'species', 'stocking_date', 'quantity', 'status')
    list_filter = ('status', 'species', 'pond')
    search_fields = ('pond__name', 'species__name')


@admin.register(FingerlingStocking)
class FingerlingStockingAdmin(admin.ModelAdmin):
    list_display = ('id', 'batch', 'supplier', 'quantity', 'cost', 'date')
    list_filter = ('date',)


@admin.register(FeedInventory)
class FeedInventoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'delivery_date', 'quantity_kg', 'supplier', 'cost')
    list_filter = ('delivery_date',)


@admin.register(FeedConsumption)
class FeedConsumptionAdmin(admin.ModelAdmin):
    list_display = ('id', 'pond', 'date', 'quantity_kg')
    list_filter = ('date', 'pond')


@admin.register(MortalityRecord)
class MortalityRecordAdmin(admin.ModelAdmin):
    list_display = ('id', 'batch', 'date', 'count', 'cause')
    list_filter = ('date',)


@admin.register(WaterQuality)
class WaterQualityAdmin(admin.ModelAdmin):
    list_display = ('id', 'pond', 'date', 'ph_level', 'flow_status', 'ammonia_level')
    list_filter = ('date', 'flow_status', 'pond')


@admin.register(SecurityIncident)
class SecurityIncidentAdmin(admin.ModelAdmin):
    list_display = ('id', 'pond', 'date', 'type')
    list_filter = ('type', 'date', 'pond')


@admin.register(Worker)
class WorkerAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'role', 'phone', 'wage_rate', 'active')
    list_filter = ('role', 'active')
    search_fields = ('name', 'phone')


@admin.register(Attendance)
class AttendanceAdmin(admin.ModelAdmin):
    list_display = ('id', 'worker', 'date', 'status')
    list_filter = ('status', 'date')


@admin.register(Expense)
class ExpenseAdmin(admin.ModelAdmin):
    list_display = ('id', 'category', 'amount', 'date', 'batch')
    list_filter = ('category', 'date')


@admin.register(Harvest)
class HarvestAdmin(admin.ModelAdmin):
    list_display = ('id', 'batch', 'date', 'total_weight_kg', 'grade', 'type')
    list_filter = ('grade', 'type', 'date')


@admin.register(Buyer)
class BuyerAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'market_location', 'phone')
    search_fields = ('name',)


@admin.register(Sale)
class SaleAdmin(admin.ModelAdmin):
    list_display = ('id', 'harvest', 'buyer', 'weight_kg', 'rate_per_kg', 'total_amount', 'date', 'payment_status')
    list_filter = ('payment_status', 'date')


@admin.register(Auction)
class AuctionAdmin(admin.ModelAdmin):
    list_display = ('id', 'sale', 'highest_bid', 'bidder_name', 'auction_date')
    list_filter = ('auction_date',)


# Customize admin site header
admin.site.site_header = "Fish Farm Management System"
admin.site.site_title = "FFMS Admin"
admin.site.index_title = "Welcome to FFMS Admin Panel"