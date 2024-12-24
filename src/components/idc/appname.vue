<template>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="机房编号">
            <el-input v-model="formInline.idcNum" placeholder="请输入机房编号" clearable />
        </el-form-item>
        <el-form-item label="园区编号">
            <el-input v-model="formInline.parkNum" placeholder="请输入园区编号" clearable />
        </el-form-item>
        <el-form-item label="机房服务商">
            <el-input v-model="formInline.idcServiceProvider" placeholder="请输入机房服务商" clearable />
        </el-form-item>
        <el-form-item label="网络运营商">
            <el-input v-model="formInline.networkOperator" placeholder="请输入网络运营商" clearable />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSearch">搜索</el-button>
            <el-button @click="onReset">重置</el-button>
        </el-form-item>
    </el-form>
    <el-card style="max-width: 100%;margin-top: 40px;">
        <div>
            <h1>IDC机房信息</h1>
            <div style="display: flex; justify-content: flex-end; margin-bottom: 10px;">
                <button @click="openModal = true">⚙️ 字段显示配置</button>
                <button @click="exportToExcel" style="margin-left: 10px;">导出 Excel</button>
            </div>

            <table cellpadding="0" cellspacing="0" style="border: 1px solid #000;margin-bottom: 10px;">
                <thead>
                    <tr>
                        <th v-for="field in selectedFields" :key="field">
                            {{ fieldMapping[field] }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="border-bottom:  1px solid #000;border-top:  1px solid #000;"
                        v-for="item in currentData" :key="item.bk_inst_id">
                        <td v-for="field in selectedFields" :key="field">{{ item[field] }}</td>
                    </tr>
                </tbody>
            </table>

            <div>
                <button @click="prevPage" :disabled="currentPage === 1">上一页</button>
                <span> Page {{ currentPage }} of {{ totalPages }} </span>
                <button @click="nextPage" :disabled="currentPage === totalPages">下一页</button>
            </div>

            <FieldSettingsModal v-if="openModal" :fields="availableFields" :selectedFields="selectedFields"
                @close="openModal = false" @update-fields="updateSelectedFields" />
        </div>
    </el-card>

</template>
<script >
import FieldSettingsModal from '../FieldSettingsModal.vue';
import { ref, computed, onMounted, reactive } from 'vue';
import axios from 'axios';
import * as XLSX from 'xlsx';
export default {
    components: {
        FieldSettingsModal,
    },
    setup() {
        // 创建表单的数据模型
        const formInline = reactive({
            idcNum: '',
            parkNum: '',
            idcServiceProvider: '',
            networkOperator: '',
        })
        const data = ref([]);
        // 中英文映射字典需要包含模型全部字段
        const fieldMapping = {
            bk_inst_id: "实例ID",
            bk_inst_name: "实例名称",
            idc_num: "机房编号",
            idc_name: "机房名称",
            idc_address: "机房地址",
            park_num: "园区编号",
            idc_service_provider: "机房服务商",
            duty_phone_num: "值班电话",
            business_email: "商务邮箱",
            network_operator: "网络运营商",
            idc_introduction: "机房介绍"
        };
        const availableFields = [
            "bk_inst_id",
            "bk_inst_name",
            "idc_num",
            "idc_name",
            "idc_address",
            "park_num",
            "idc_service_provider",
            "duty_phone_num",
            "business_email",
            "network_operator",
            "idc_introduction"
        ];
        // 配置默认展示字段
        const selectedFields = ref(["idc_num", "park_num", "idc_service_provider", "network_operator"]);
        const openModal = ref(false);
        const currentPage = ref(1);
        // 分页大小设置
        const itemsPerPage = 20;

        const fetchData = async () => {
            try {
                // 默认展示全部数据
                const response = await axios.post("http://apps.blueking.megaspeed-tech.ai/idc/api/cmdb/get_ins_by_condition", {
                    "obj_id": "IDC",
                    "conditions": {}
                });

                // console.log('Response:', response.data);  // 添加调试信息
            
                if (response.data && response.data.info && Array.isArray(response.data.info)) {
                    data.value = response.data.info;
                    
                } else {
                    console.error('Unexpected response format:', response.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        onMounted(() => {
            fetchData();
        });

        const totalPages = computed(() => Math.ceil(data.value.length / itemsPerPage));
        const currentData = computed(() =>
            data.value.slice((currentPage.value - 1) * itemsPerPage, currentPage.value * itemsPerPage)
        );

        const prevPage = () => {
            if (currentPage.value > 1) {
                currentPage.value--;
            }
        };

        const nextPage = () => {
            if (currentPage.value < totalPages.value) {
                currentPage.value++;
            }
        };

        const updateSelectedFields = (newFields) => {
            selectedFields.value = newFields;
        };
        // 添加导出Excel的方法
        const exportToExcel = () => {
            const worksheetData = [];

            // 添加表头
            const headers = selectedFields.value.map(field => ({
                v: field.charAt(0).toUpperCase() + field.slice(1),
                s: { fill: { fgColor: { rgb: "FFFF00" } } } // 可选：设置表头背景色
            }));
            worksheetData.push(headers);

            // 添加数据行
            data.value.forEach(item => {
                const row = selectedFields.value.map(field => ({
                    v: item[field],
                    t: 's' // 确保字符串不会被切割
                }));
                worksheetData.push(row);
            });

            const ws = XLSX.utils.aoa_to_sheet(worksheetData);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
            XLSX.writeFile(wb, "data.xlsx");
        };

        

        // 搜索按钮的点击事件
        const onSearch = async () => {
            console.log('搜索提交的数据:', formInline);
            try {
                const conditions = {};
                for (const key in formInline) {
                    if (formInline[key] !== '') {
                        conditions[key] = formInline[key];
                    }
                }
                const response = await axios.post('http://apps.blueking.megaspeed-tech.ai/idc/api/cmdb/get_ins_by_condition', {
                    "obj_id": "IDC",
                    "conditions": {
                        idc_num: formInline.idcNum,
                        park_num: formInline.parkNum,
                        idc_service_provider: formInline.idcServiceProvider,
                        network_operator: formInline.networkOperator,
                    }
                });

                console.log('Response:', response.data);  // 添加调试信息

                if (response.data && response.data.info && Array.isArray(response.data.info)) {
                    data.value = response.data.info;
                } else {
                    console.error('Unexpected response format:', response.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        // 重置按钮的点击事件，清空表单数据
        const onReset = () => {
            for (const key in formInline) {
                if (formInline.hasOwnProperty(key)) {
                    formInline[key] = ''
                }
            }
        }

        return {
            data,
            availableFields,
            selectedFields,
            openModal,
            currentPage,
            totalPages,
            currentData,
            formInline,
            prevPage,
            nextPage,
            updateSelectedFields,
            exportToExcel,
            onReset,
            onSearch,
            fieldMapping,
        };
    },
};
</script>

<style>
.demo-form-inline .el-input {
    --el-input-width: 170px;
}

.demo-form-inline .el-button {
    margin-left: 10px;
}
table {
    width: 100%;
    margin-top: 20px;
}

th,
td {
    padding: 8px;
    text-align: left;
}
</style>