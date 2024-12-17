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
          idc_introduction: "机房介绍"
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
  width: 300px;
}

.modal-content h2 {
  margin-bottom: 20px;
}

.modal-content label {
  display: block;
  margin-bottom: 10px;
}

.modal-content button {
  margin-top: 20px;
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.modal-content button:hover {
  background-color: #0056b3;
}
</style>
