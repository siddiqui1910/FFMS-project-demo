from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.authentication import SessionAuthentication

from .models import (
    Pond, Species, Batch, FingerlingStocking,
    FeedInventory, FeedConsumption, MortalityRecord,
    WaterQuality, SecurityIncident, Worker,
    Attendance, Expense, Harvest, Buyer, Sale, Auction,
)
from .serializers import (
    PondSerializer, SpeciesSerializer, BatchSerializer,
    FingerlingStockingSerializer, FeedInventorySerializer,
    FeedConsumptionSerializer, MortalityRecordSerializer,
    WaterQualitySerializer, SecurityIncidentSerializer,
    WorkerSerializer, AttendanceSerializer, ExpenseSerializer,
    HarvestSerializer, BuyerSerializer, SaleSerializer, AuctionSerializer,
)


# ============================================================
# DEV-ONLY: Skip CSRF for API endpoints (session auth still required)
# Do NOT use this pattern in production.
# ============================================================
class CsrfExemptSessionAuthentication(SessionAuthentication):
    def enforce_csrf(self, request):
        return


class BaseViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    authentication_classes = [CsrfExemptSessionAuthentication]


# ============================================================
# 1. POND
# ============================================================
class PondViewSet(BaseViewSet):
    queryset = Pond.objects.all()
    serializer_class = PondSerializer


# ============================================================
# 2. SPECIES
# ============================================================
class SpeciesViewSet(BaseViewSet):
    queryset = Species.objects.all()
    serializer_class = SpeciesSerializer


# ============================================================
# 3. BATCH
# ============================================================
class BatchViewSet(BaseViewSet):
    queryset = Batch.objects.all()
    serializer_class = BatchSerializer


# ============================================================
# 4. FINGERLING STOCKING
# ============================================================
class FingerlingStockingViewSet(BaseViewSet):
    queryset = FingerlingStocking.objects.all()
    serializer_class = FingerlingStockingSerializer


# ============================================================
# 5. FEED INVENTORY
# ============================================================
class FeedInventoryViewSet(BaseViewSet):
    queryset = FeedInventory.objects.all()
    serializer_class = FeedInventorySerializer


# ============================================================
# 6. FEED CONSUMPTION
# ============================================================
class FeedConsumptionViewSet(BaseViewSet):
    queryset = FeedConsumption.objects.all()
    serializer_class = FeedConsumptionSerializer


# ============================================================
# 7. MORTALITY RECORD
# ============================================================
class MortalityRecordViewSet(BaseViewSet):
    queryset = MortalityRecord.objects.all()
    serializer_class = MortalityRecordSerializer


# ============================================================
# 8. WATER QUALITY
# ============================================================
class WaterQualityViewSet(BaseViewSet):
    queryset = WaterQuality.objects.all()
    serializer_class = WaterQualitySerializer


# ============================================================
# 9. SECURITY INCIDENT
# ============================================================
class SecurityIncidentViewSet(BaseViewSet):
    queryset = SecurityIncident.objects.all()
    serializer_class = SecurityIncidentSerializer


# ============================================================
# 10. WORKER
# ============================================================
class WorkerViewSet(BaseViewSet):
    queryset = Worker.objects.all()
    serializer_class = WorkerSerializer


# ============================================================
# 11. ATTENDANCE
# ============================================================
class AttendanceViewSet(BaseViewSet):
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer


# ============================================================
# 12. EXPENSE
# ============================================================
class ExpenseViewSet(BaseViewSet):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer


# ============================================================
# 13. HARVEST
# ============================================================
class HarvestViewSet(BaseViewSet):
    queryset = Harvest.objects.all()
    serializer_class = HarvestSerializer


# ============================================================
# 14. BUYER
# ============================================================
class BuyerViewSet(BaseViewSet):
    queryset = Buyer.objects.all()
    serializer_class = BuyerSerializer


# ============================================================
# 15. SALE
# ============================================================
class SaleViewSet(BaseViewSet):
    queryset = Sale.objects.all()
    serializer_class = SaleSerializer


# ============================================================
# 16. AUCTION
# ============================================================
class AuctionViewSet(BaseViewSet):
    queryset = Auction.objects.all()
    serializer_class = AuctionSerializer