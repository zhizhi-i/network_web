<template>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="客户">
            <el-input v-model="formInline.customer" placeholder="请输入客户" clearable />
        </el-form-item>
        <el-form-item label="网络架构">
            <el-input v-model="formInline.networkArchitecture" placeholder="请输入网络架构" clearable />
        </el-form-item>
        <el-form-item label="设备角色">
            <el-input v-model="formInline.deviceRole" placeholder="请输入设备角色" clearable />
        </el-form-item>
        <el-form-item label="设备厂家">
            <el-input v-model="formInline.deviceManufacturer" placeholder="请输入设备厂家" clearable />
        </el-form-item>
        <el-form-item label="设备型号">
            <el-input v-model="formInline.deviceModel" placeholder="请输入设备型号" clearable />
        </el-form-item>
        <el-form-item label="设备大小">
            <el-input v-model="formInline.deviceSize" placeholder="请输入设备大小" clearable />
        </el-form-item>
        <el-form-item label="设备功耗">
            <el-input v-model="formInline.devicePower" placeholder="请输入设备功耗" clearable />
        </el-form-item>
        <el-form-item label="引入时间">
            <el-date-picker v-model="formInline.introductionTime" 
            type="date" placeholder="请选择引入时间" value-format="YYYY-MM-DD" clearable />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSearch">搜索</el-button>
            <el-button @click="onReset">重置</el-button>
        </el-form-item>
    </el-form>
    <el-card style="max-width: 100%;margin-top: 40px;">
        <div>
            <h1>IDC网络设备</h1>
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
import FieldSettingsModal from './FieldSettingsModal.vue';
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
            customer: '',
            networkArchitecture: '',
            deviceRole: '',
            deviceManufacturer: '',
            deviceModel: '',
            deviceSize: '',
            devicePower: '',
            introductionTime: '',
        })
        const data = ref([]);
        const fieldMapping = {
            bk_inst_id: "实例ID",
            bk_inst_name: "实例名称",
            brand: "品牌",
            brand_model: "品牌型号",
            cpu_number: "U数",
            customer: "客户",
            device_role: "设备角色",
            introduction_time: "引入时间",
            manufacturer: "厂家",
            manufacturer_model_number: "厂家型号",
            network_architecture: "网络架构",
            port_number: "端口数量",
            power_consumption: "功耗",
            size: "大小"
        };
        const availableFields = [
            "bk_inst_id",
            "bk_inst_name",
            "brand",
            "brand_model",
            "cpu_number",
            "customer",
            "device_role",
            "introduction_time",
            "manufacturer",
            "manufacturer_model_number",
            "network_architecture",
            "port_number",
            "power_consumption",
            "size"
        ];
        const selectedFields = ref(["customer", "brand", "brand_model", "network_architecture", "device_role", "manufacturer", "manufacturer_model_number"]);
        const openModal = ref(false);
        const currentPage = ref(1);
        // 分页大小设置
        const itemsPerPage = 20;

        // const exportToExcel = () => {
        //   const ws = XLSX.utils.json_to_sheet(selectedFields.value);
        //   const wb = XLSX.utils.book_new();
        //   XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
        //   XLSX.writeFile(wb, "data.xlsx");
        // };

        const fetchData = async () => {
            try {
                // 默认展示全部数据
                const response = await axios.post("http://apps.blueking.megaspeed-tech.ai/idc/api/cmdb/get_ins_by_condition", {
                    "obj_id": "IDC_Deliver",
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
                    "obj_id": "IDC_Deliver",
                    "conditions": {
                        customer: formInline.customer,
                        network_architecture: formInline.networkArchitecture ,
                        device_role: formInline.deviceRole,
                        manufacturer: formInline.deviceManufacturer,
                        manufacturer_model_number: formInline.deviceModel,
                        size:  formInline.deviceSize,
                        power_consumption: formInline.devicePower,
                        introduction_time: formInline.introductionTime
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