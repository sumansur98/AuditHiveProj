import { configureStore } from '@reduxjs/toolkit';
import datasetsReducer from './slice/datasetsSlice';
import salesComparisonReducer from './slice/salesComparisonSlice';
import riskBreakdownByCategoryReducer from './slice/riskBreakdownByCategorySlice';
import totalVsFlaggedTaxpayersReducer from './slice/totalVsFlaggedTaxpayersSlice';
import riskAnalysisByIndustryReducer from './slice/riskAnalysisByIndustrySlice';
import riskAnomalyFrequencyReducer from './slice/riskAnomalyFrequencySlice';

const store = configureStore({
  reducer: {
    datasets: datasetsReducer,
    salesComparison: salesComparisonReducer,
    riskBreakdownByCategory: riskBreakdownByCategoryReducer,
    totalVsFlaggedTaxpayers: totalVsFlaggedTaxpayersReducer,
    riskAnalysisByIndustry: riskAnalysisByIndustryReducer,
    riskAnomalyFrequency: riskAnomalyFrequencyReducer,
  },
});

export default store;
