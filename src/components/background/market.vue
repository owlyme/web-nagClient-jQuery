<template>
    <div class="table-container">
        <el-table :data="tableData" style="width: 100%" height="530" stripe>
            <el-table-column fixed prop="productName_zhtw" :label="$t('transactionrecord.hint13')"></el-table-column>
            <el-table-column prop="symbol" :label="$t('message.code')"></el-table-column>
            <el-table-column prop="typicalSpread" :label="$t('message.Guidance')"></el-table-column>
            <el-table-column prop="tickValue" :label="$t('message.PVBP')"></el-table-column>
            <el-table-column prop="swapRateLong" :label="$t('message.Overnightinterests')"></el-table-column>
            <el-table-column prop="swapRateShort" :label="$t('message.overnightinterest')"></el-table-column>
            <el-table-column prop="marginRequirement" :label="$t('message.marginrequirement')"></el-table-column>
            <el-table-column width="180px" prop="tradingHoursGMT" :label="$t('message.tradinghour')"></el-table-column>
            <el-table-column prop="tradingBreaksGMT" :label="$t('transactionrecord.hint14')"></el-table-column>
        </el-table>
        <p class="text">*所有現貨產品持倉過夜 "End-of-Day" 都將會按照 NAG Markets 所定義的隔夜利息而收取。所有外匯和貴金屬產品將每周三收取3天隔夜利息，而所有能源和指數產品（除CN50外）將在每周五收取3天隔夜利息。</p>
    </div>
</template>

<script>
import notdata from '@/components/common/notdata';
export default {
    components: {
        notdata
    },
    data() {
        return {
            tableData: []
        };
    },
    created() {
        this.$api.user.paytradeInfos({}, res => {
            this.tableData = res.data.list;
        });
    }
};
</script>
<style scoped lang="scss">
@import '@/style/_style.scss';
.text{
    color: #333;
    font-size: 14px
}
</style>