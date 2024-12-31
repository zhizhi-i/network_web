<template>
  <div class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <h2>字段配置</h2>
      <div v-for="field in fields" :key="field">
        <label>
          <input 
            type="checkbox" 
            :value="field" 
            :checked="localSelectedFields.includes(field)" 
            @change="toggleField(field)"
          />
          {{ fieldMapping[field] || field }} <!-- 使用映射对象显示中文 -->
        </label>
      </div>
      <button @click="saveAndClose">保存并关闭</button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  props: {
    fields: {
      type: Array,
      required: true,
    },
    selectedFields: {
      type: Array,
      required: true,
    },
  },
  emits: ['close', 'update-fields'],
  setup(props, { emit }) {
    // 字段名映射为中文的对象
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
          size: "大小",
          server_model: "型号",
          server_brand: "品牌",
          model_code: "机型",
          gpu_model: "GPU型号",
          gpu_num: "GPU数量",
          cpu_model: "CPU型号",
          cpu_num: "CPU数量",
          memory_model: "内存型号",
          memory_num: "内存数量",
          disk_model: "硬盘型号",
          disk_num: "硬盘数量",
          power_model: "电源型号",
          power_num: "电源数量",
          fan_model: "风扇型号",
          fan_num: "风扇数量",
          line_number: "专线编号",
          operator: "运营商",
          dedicated_line_bandwidth: "专线带宽",
          a_end: "A端",
          a_end_position: "A端位置",
          a_odf_position: "A端ODF位置",
          z_end: "Z端",
          z_end_position: "Z端位置",
          z_odf_position: "Z端ODF位置",
          customer_service_tel_num: "客服电话",
          customer_service_mail: "客服邮箱",
          after_sales_dock: "售后文档",
          idc_num: "机房编号",
          idc_name: "机房名称",
          idc_address: "机房地址",
          park_num: "园区编号",
          idc_service_provider: "机房服务商",
          duty_phone_num: "值班电话",
          business_email: "商务邮箱",
          network_operator: "网络运营商",
          idc_introduction: "机房介绍",
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

    const localSelectedFields = ref([...props.selectedFields]);

    const toggleField = (field) => {
      if (localSelectedFields.value.includes(field)) {
        localSelectedFields.value = localSelectedFields.value.filter(f => f !== field);
      } else {
        localSelectedFields.value.push(field);
      }
    };

    const closeModal = () => {
      emit('close');
    };

    const saveAndClose = () => {
      emit('update-fields', localSelectedFields.value);
      closeModal();
    };

    return {
      fieldMapping, // 映射字段用于中文显示
      localSelectedFields,
      toggleField,
      closeModal,
      saveAndClose,
    };
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 80%; /* 自适应宽度 */
  max-width: 600px; /* 最大宽度 */
  max-height: 80vh; /* 防止过高 */
  overflow-y: auto; /* 超出高度时滚动 */
  display: flex;
  flex-wrap: wrap; /* 自动换行 */
  gap: 10px; /* 字段之间的间距 */
  align-items: flex-start; /* 顶部对齐 */
}

/* 标题样式 */
.modal-content h2 {
  width: 100%;
  margin-bottom: 20px;
}

/* 字段样式 */
.modal-content label {
  display: flex;
  align-items: center;
  gap: 5px;
  margin: 0;
  font-size: 14px;
  white-space: nowrap; /* 防止文本换行 */
}

/* 每个字段占据空间 */
.modal-content label {
  flex: 0 1 calc(33.33% - 10px); /* 每行最多 3 个字段，保持间距 */
  box-sizing: border-box;
}

/* 按钮区域样式 */
.modal-content button {
  margin-top: 20px;
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  align-self: flex-end; /* 将按钮固定在右下角 */
}

.modal-content button:hover {
  background-color: #0056b3;
}
</style>
