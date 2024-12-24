<template>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="机柜编号">
            <el-input v-model="formInline.cabinetNum" placeholder="请输入机柜编号" clearable />
        </el-form-item>
        <el-form-item label="房间编号">
            <el-input v-model="formInline.roomNum" placeholder="请输入房间编号" clearable />
        </el-form-item>
        <el-form-item label="楼号">
            <el-input v-model="formInline.floorNum" placeholder="请输入楼号" clearable />
        </el-form-item>
        <el-form-item label="机房编号">
            <el-input v-model="formInline.machineRoomNum" placeholder="请输入机房编号" clearable />
        </el-form-item>
        <el-form-item label="实例名">
            <el-input v-model="formInline.bkInstName" placeholder="请输入实例名" clearable />
        </el-form-item>
        <el-form-item label="机房名称">
            <el-input v-model="formInline.machineRoom" placeholder="请输入机房名称" clearable />
        </el-form-item>
        <el-form-item label="客户机房编号">
            <el-input v-model="formInline.customerMachineRoomNum" placeholder="请输入客户机房编号" clearable />
        </el-form-item>
        <el-form-item label="BU">
            <el-input v-model="formInline.costParty" placeholder="请输入BU" clearable />
        </el-form-item>
        <el-form-item label="机柜类型">
            <el-input v-model="formInline.cabinetType" placeholder="请输入机柜类型" clearable />
        </el-form-item>
        <el-form-item label="机柜类型明细">
            <el-input v-model="formInline.cabinetTypeDetails" placeholder="请输入机柜类型明细" clearable />
        </el-form-item>
        <el-form-item label="生命周期">
            <el-input v-model="formInline.lifeCycle" placeholder="请输入生命周期" clearable />
        </el-form-item>
        <el-form-item label="加电状态">
            <el-input v-model="formInline.powerState" placeholder="请输入加电状态" clearable />
        </el-form-item>
        <el-form-item label="加电时间">
            <el-date-picker v-model="formInline.powerDate" 
            type="date" placeholder="请选择加电时间" value-format="YYYY-MM-DD" clearable />
        </el-form-item>
        <el-form-item label="网络架构">
            <el-input v-model="formInline.networkArchitecture" placeholder="请输入网络架构" clearable />
        </el-form-item>
        <el-form-item label="机柜规格">
            <el-input v-model="formInline.cabinetSpecification" placeholder="请输入机柜规格" clearable />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSearch">搜索</el-button>
            <el-button @click="onReset">重置</el-button>
        </el-form-item>
    </el-form>
    <el-card style="max-width: 100%;margin-top: 40px;">
        <div>
            <h1>IDC机柜信息</h1>
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
            cabinetNum: '',
            roomNum: '',
            floorNum: '',
            machineRoomNum: '',
            bkInstName: '',
            machineRoom: '',
            customerMachineRoomNum: '',
            costParty: '',
            cabinetType: '',
            cabinetTypeDetails: '',
            lifeCycle: '',
            powerState: '',
            powerDate: '',
            networkArchitecture: '',
            cabinetSpecification: '',
        })
        const data = ref([]);
        // 中英文映射字典需要包含模型全部字段
        const fieldMapping = {
            bk_inst_id: "实例ID",
            bk_inst_name: "实例名称",
            cabinet_num: "机柜编号",
            room_num: "房间编号",
            floor_num: "楼号",
            machine_room_num: "机房编号",
            machine_room: "机房名称",
            customer_machine_room_num: "客户机房编号",
            cabinet_type_details: "机柜类型明细",
            cost_party: "BU",
            cabinet_type: "机柜类型",
            life_cycle: "生命周期",
            power_state: "加电状态",
            power_date: "加电日期",
            network_architecture: "网络架构",
            network_cluster: "网络集群",
            group_number: "分组编号",
            cabinet_specification: "机柜规格",
            cabinet_height: "机柜高度",
            cabinet_width: "机柜宽度",
            u_height: "U高",
            start_u: "起始U位",
            end_u: "结束U位",
            power_supply_type: "供电类型",
            power_supply_mode: "供电方式",
            power_number: "电源路数",
            pdu_number: "PDU数",
            pdu_mode: "PDU规格",
            rated_power: "额定功率",
            maximum_power: "最大功率",
            owner_a: "管理员A角",
            owner_b: "管理员B角",
            description: "备注"
        };
        const availableFields = [
            "bk_inst_id",
            "bk_inst_name",
            "cabinet_num",
            "room_num",
            "floor_num",
            "machine_room_num",
            "machine_room",
            "customer_machine_room_num",
            "cabinet_type_details",
            "cost_party",
            "cabinet_type",
            "life_cycle",
            "power_state",
            "power_date",
            "network_architecture",
            "network_cluster",
            "group_number",
            "cabinet_specification",
            "cabinet_height",
            "cabinet_width",
            "u_height",
            "start_u",
            "end_u",
            "power_supply_type",
            "power_supply_mode",
            "power_number",
            "pdu_number",
            "pdu_mode",
            "rated_power",
            "maximum_power",
            "owner_a",
            "owner_b",
            "description"
        ];
        // 配置默认展示字段
        const selectedFields = ref(["cabinet_num", "room_num", "floor_num", "machine_room_num", "machine_room", "customer_machine_room_num", "cabinet_type_details", "cost_party", "cabinet_type", "life_cycle", "power_state", "power_date", "network_architecture", "network_cluster", "group_number", "cabinet_specification"]);
        const openModal = ref(false);
        const currentPage = ref(1);
        // 分页大小设置
        const itemsPerPage = 20;

        const fetchData = async () => {
            try {
                // 默认展示全部数据
                const response = await axios.post("http://apps.blueking.megaspeed-tech.ai/idc/api/cmdb/get_ins_by_condition", {
                    "obj_id": "cabinet",
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
                    "obj_id": "cabinet",
                    "conditions": {
                        cabinet_num: formInline.cabinetNum,
                        room_num: formInline.roomNum,
                        floor_num: formInline.floorNum,
                        machine_room_num: formInline.machineRoomNum,
                        machine_room: formInline.machineRoom,
                        customer_machine_room_num: formInline.customerMachineRoomNum,
                        cost_party: formInline.costParty,
                        cabinet_type_details: formInline.cabinetTypeDetails,
                        cabinet_type: formInline.cabinetType,
                        life_cycle: formInline.lifeCycle,
                        power_state: formInline.powerState,
                        power_date: formInline.powerDate,
                        network_architecture: formInline.networkArchitecture,
                        cabinet_specification: formInline.cabinetSpecification
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