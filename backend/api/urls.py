from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    PondViewSet, SpeciesViewSet, BatchViewSet,
    FingerlingStockingViewSet, FeedInventoryViewSet,
    FeedConsumptionViewSet, MortalityRecordViewSet,
    WaterQualityViewSet, SecurityIncidentViewSet,
    WorkerViewSet, AttendanceViewSet, ExpenseViewSet,
    HarvestViewSet, BuyerViewSet, SaleViewSet, AuctionViewSet,
)
from .auth_views import login_view, logout_view, me_view

router = DefaultRouter()
router.register(r'ponds', PondViewSet)
router.register(r'species', SpeciesViewSet)
router.register(r'batches', BatchViewSet)
router.register(r'fingerling-stockings', FingerlingStockingViewSet)
router.register(r'feed-inventory', FeedInventoryViewSet)
router.register(r'feed-consumption', FeedConsumptionViewSet)
router.register(r'mortality', MortalityRecordViewSet)
router.register(r'water-quality', WaterQualityViewSet)
router.register(r'incidents', SecurityIncidentViewSet)
router.register(r'workers', WorkerViewSet)
router.register(r'attendance', AttendanceViewSet)
router.register(r'expenses', ExpenseViewSet)
router.register(r'harvests', HarvestViewSet)
router.register(r'buyers', BuyerViewSet)
router.register(r'sales', SaleViewSet)
router.register(r'auctions', AuctionViewSet)

urlpatterns = [
    # Auth endpoints
    path('auth/login/', login_view, name='auth-login'),
    path('auth/logout/', logout_view, name='auth-logout'),
    path('auth/me/', me_view, name='auth-me'),
    
    # All model endpoints
    path('', include(router.urls)),
]