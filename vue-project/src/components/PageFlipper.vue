<template>

    <div>
        <el-row :gutter="20" justify="end" style="margin-top: 10px">
            <el-col :span="24" style="display: flex; align-items: center; justify-content: end;">
                <span style="margin-right: 10px;">
                    共{{total}}条, {{ totalPageInteger }}页
                </span>
            
                <el-select style="width: 150px;" v-model="pageFlipper.pageSize" @change="this.$emit('pageChange', returnData)" :disabled="!disableFlag">
                    <el-option v-for="item in [3,10,20,30,50,100]" :key="item" :value="item" :label="`${item}条/页`"></el-option>
                </el-select>
        
                <el-pagination
                v-model:current-page="pageFlipper.pageNum"          
                layout="prev, pager, next"
                :page-size="pageFlipper.pageSize"
                :pager-count="pageFlipper.pagerCount"
                :page-count="totalPageInteger"
                @change="this.$emit('pageChange', returnData)"
                :disabled = "!disableFlag"
                />
                
            </el-col>
        </el-row>
    </div>

</template>

<script>
export default {
    props: {
        total: {
            required: true,
            type: Number
        },

        pageSize: {
            required: true,
            type: Number
        },
        
        pageNum: {
            required: true,
            type: Number
        },

        pagerCount: {
            default: 7,
            type: Number
        },

        disableFlag: {
            default: true,
            type: Boolean
        }

    },

    data() {
        return {
            pageFlipper: {
                pageSize: this.pageSize,
                pageNum: this.pageNum,
                pagerCount: this.pagerCount,
            }
        }
    },

    computed: {
        totalPageInteger() {
            return Math.floor(this.total / this.pageFlipper.pageSize);
        },

        returnData() {
            return {'pageNum': this.pageFlipper.pageNum, 'pageSize': this.pageFlipper.pageSize}
        }
    }
}
</script>