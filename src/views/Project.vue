<template>
  <div class="project">
    <div class="project_header flex_between">
      <div class="project_header_title flex">
        <img :src="icon_project_title" alt="" />
        <span>全部大屏</span>
      </div>
      <div class="project_header_search flex">
        <div class="order">
          <span @click="positive" :class="focusSearch ? 'focus' : ''"
            >正序</span
          >
          <i class="line">|</i>
          <span @click="reverse" :class="focusSearch == false ? 'focus' : ''"
            >倒序</span
          >
        </div>
        <!-- :dropdownStyle="{width: '120px',border: '1px solid #0561AE',background: '#001426'}" -->
        <a-select
          ref="select"
          v-model:value="param.sortFeild"
          style="width: 120px"
          @change="handleChange"
        >
          <a-select-option value="updatetime">修改时间</a-select-option>
          <a-select-option value="firstletter">名称</a-select-option>
        </a-select>
      </div>
    </div>
    <a-input-search
      v-model:value="param.title"
      placeholder="请输入标题"
      style="width: 230px; margin: 0 0 20px"
      @search="onSearchValue"
    />
    <div class="gutter-example" @click="clickInput">
      <div :gutter="16">
        <!-- :xs="12" :sm="12" :md="12" :lg="7" :xl="4" -->
        <div class="inline">
          <div class="gutter-box flex-wrap" @click="addProject">
            <img :src="add" alt="" />
            <span>创建新项目</span>
          </div>
        </div>
        <div v-for="(item, i) in projectList" :key="i" class="inline">
          <div
            class="gutter-box"
            @mouseenter="mouseOver(i)"
            @mouseleave="mouseLeave(i)"
            >
            <div class="top">
              <div v-if="active == i" class="topHover">
                <a-tooltip placement="bottom" @click="searchPageData(item.id)">
                  <template #title>
                    <span>预览</span>
                  </template>
                  <img :src="icon_project_search" alt="" />
                </a-tooltip>
                <a-tooltip placement="bottom" @click="editCanvas(item)">
                  <template #title>
                    <span>编辑</span>
                  </template>
                  <img :src="icon_project_edit" alt="" />
                </a-tooltip>
                <a-tooltip placement="bottom" @click="deletePageData(item.id)">
                  <template #title>
                    <span>删除</span>
                  </template>
                  <img :src="icon_project_del" alt="" />
                </a-tooltip>
              </div>
              <img :src="item.screenshotPath ? `${baseURL}/static/${item.screenshotPath}?${new Date().getTime()}` : bg_project_item" alt="" height="145" width="206"/>
            </div>
            <div class="buttom">
              <div class="action">
                <div class="flex edit-title-box">
                  <EditOutlined />
                  <a-input
                    v-if="editTitle == i"
                    v-model:value="item.title"
                    @change="changeInput(item)"
                    @blur="blurInput(i, item)"
                    size="small"
                  />
                  <span
                    class="title"
                    v-else
                    @click.stop="editPageData(i, item)"
                    >{{ item.title }}</span
                  >
                </div>
              </div>
              <div class="date">
                修改时间：{{ timestampToTime(item.updatetime) }}
              </div>
              <div class="address">
                <span class="label">发布地址：</span>
                <a :href="item.pageId ? `${WEBURL}/page/${item.pageId}` : null" class="center" target="_blank">{{item.pageId ? `${WEBURL}/page/${item.pageId}` : '未发布' }}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 分页 -->
    <a-config-provider :locale="zhCN">
      <a-pagination
        show-quick-jumper
        :total="total"
        :current="param.pageNum"
        :pageSize="param.pageSize"
        @change="onChange"
        size="small"
        style="text-align: center"
        :show-total="(totalde) => `共 ${totalde} 条数据`"
      />
    </a-config-provider>
    <a-modal
      v-model:visible="visible"
      width="440px"
      title="新增"
      cancelText="取消"
      okText="保存"
      @ok="onSubmit"
      @cancel="cancel"
      :cancel-button-props="{
        style: { color: '#fff', background: '#008BC9', borderColor: '#008BC9' },
      }"
    >
      <a-form
        ref="formRef"
        :model="formState"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-item
          ref="title"
          label="名称"
          placeholder="请填写名称"
          name="title"
        >
          <a-input v-model:value="formState.title" />
        </a-form-item>
        <a-form-item
          ref="type"
          label="类型"
          placeholder="请选择类型"
          name="type"
        >
          <a-select v-model:value="formState.type" placeholder="请选择类型">
            <a-select-option value="1">大屏 (2560 × 1080)</a-select-option>
            <a-select-option value="2">iPad 横屏 (1024 × 768)</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
      <Preview v-model="isShowPreview" />
  </div>
</template>
<script>
import { useStore } from "vuex";
import componentListData from "@/custom-component/left-components-data"; // 左侧列表数
import zhCN from "ant-design-vue/lib/locale-provider/zh_CN"; // 中文
import { deepCopy } from "@/utils/utils";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons-vue";
import { effect, ref, reactive, getCurrentInstance } from "vue";
import { useRouter } from "vue-router";
import Preview from "@/components/Editor/Preview";
import WEBURL from "@/request/pro"; //获取项目发布path
import baseURL from '@/request/env'
import {
  getList,
  deleteList,
  updateList,
  selectBy,
} from "@/request/project.js";
import pinyin from "js-pinyin";
import { sessionCache } from "@/utils/cache.js";
// import { ColorPicker } from "vue3-colorpicker";
// import "vue3-colorpicker/style.css";

export default {
  components: {
    DeleteOutlined,
    EditOutlined,
    SearchOutlined,
    Preview
    // ColorPicker
  },
  setup() {
    const { commit } = useStore();
    const { proxy } = getCurrentInstance();
    const router = useRouter();
    const active = ref(null); // hover
    const editTitle = ref(null); // 标题修改控制
    const visible = ref(false); // 新增弹窗
    const focusSearch = ref(false); // 判断正序倒序
    const current = ref(1); // 分页
    const add = require("@/assets/images/add.png");
    const icon_project_title = require("@/assets/images/icon_project_title.png");
    const icon_project_del = require("@/assets/images/icon_project_del.png");
    const icon_project_edit = require("@/assets/images/icon_project_edit.png");
    const icon_project_search = require("@/assets/images/icon_project_search.png");
    const bg_project_item = require("@/assets/images/bg_project_item.png");
    const projectList = ref([]); // 数据列表
    const formRef = ref();
    const total = ref(100); // 总条数
    const param = reactive({
      // 列表查询参数
      pageNum: 1,
      pageSize: 9,
      title: "", //标题 input 筛选数据
      sortType: 1, //排序类型 1、降序 2、升序
      sortFeild: "updatetime", // 下拉选择 筛选数据
    });
    let formState = reactive({
      title: "",
      type: "",
    });

    let pinyin = require("js-pinyin");
    pinyin.setOptions({ checkPolyphone: false, charCase: 1 });
    // console.log(pinyin.getFullChars('管理员')); 全拼
    // console.log(pinyin.getCamelChars('管理员'));// 文字首字母

    const rules = {
      title: [{ required: true, message: "不能为空", trigger: "blur" }],
      type: [{ required: true, message: "不能为空", trigger: "change" }],
    };
    const getprojectList = () => {
      // console.log(param, "param.value");
      getList(param).then((res) => {
        if (res.code == 200) {
          projectList.value = res.data.data.lists;
          total.value = res.data.data.totalCount;
        }
      });
    };
    getprojectList();
    // 分页
    const onChange = (pageNumber) => {
      param.pageNum = pageNumber;
      getprojectList();
    };
    // 创建新项目 弹窗
    const addProject = () => {
      visible.value = true;
    };
    // 移入
    const mouseOver = (i) => {
      if (active.value == i) {
        active.value = -1;
      } else {
        active.value = i;
      }
    };
    // 移出
    const mouseLeave = (i) => {
      active.value = -1;
    };
    // 选择筛选条件
    const onSearchValue = (data) => {
      param.title = data;
      getprojectList();
    };
    // 选择筛选条件
    const handleChange = (data) => {
      console.log(data, "000");
      param.sortFeild = data;
      getprojectList();
    };
    // 选择筛选条件 - 正序
    const positive = () => {
      focusSearch.value = true;
      param.sortType = 2;
      getprojectList();
    };
    // 选择筛选条件 - 倒序
    const reverse = () => {
      focusSearch.value = false;
      param.sortType = 1;
      getprojectList();
    };
    const projectId = ref(null);
    const projectTitle = ref("");
    const projectTitleDefault = ref("");
    // 修改标题 -- 点击显示输入框
    const editPageData = (i, data) => {
      //  editTitle.value = true;
      if (editTitle.value == i) {
        editTitle.value = -1;
      } else {
        editTitle.value = i;
      }
      projectId.value = data.id;
      projectTitleDefault.value = data.title;
    };
    // 修改标题 -- 点击列表区域 -- 显示文本
    const clickInput = (e) => {
      if (e.target.nodeName !== "INPUT") {
        // editTitle.value = false;
        editTitle.value = -1;
        if (projectId.value && projectTitle.value) {
          const param = {
            id: projectId.value,
            title: projectTitle.value,
            firstletter: pinyin.getCamelChars(projectTitle.value).charAt(0),
          };
          if (projectTitleDefault.value !== projectTitle.value) {
            updateList(param).then((res) => {
              console.log(res);
              if (res.code == 200) {
                projectId.value = null;
                projectTitle.value = "";
                projectTitleDefault.value = "";
                getprojectList();
              }
            });
          }
        }
        console.log(e, "点击列表区域");
      }
      // if(temp != lastValue && null !=lastValue && "" !=lastValue)
    };
    // 修改标题 -- 失去焦点 -- 显示文本
    const blurInput = (i, item) => {
      // editTitle.value = false;
      editTitle.value = -1;
      console.log(i, item, "失去焦点");
    };
    // 修改标题
    const changeInput = (data) => {
      projectTitle.value = data.title;
      console.log(data.title, projectTitleDefault.value, "0007777");
    };
    // 删除画布
    const deletePageData = (id) => {
      const param = { id: id };
      deleteList(param).then((res) => {
        if (res.code == 200) {
          getprojectList();
          proxy.$message.success("删除成功");
        }
      });
    };
    // 编辑画布
    const editCanvas = (item) => {
      console.log(item,'setCanvasName')
      commit("deleteComponentAll");
      sessionCache.remove("setCanvasName");
      sessionCache.remove("setComponentData");
      let canvasStyle = {};
      if (item.canvasStyleData) {
        canvasStyle = JSON.parse(item.canvasStyleData);
      }
      commit("setCanvasName", {
        id: item.id,
        title: item.title,
        type: item.type,
        firstletter: item.firstletter,
        width: canvasStyle.width,
        height: canvasStyle.height,
      });
      
      router.push("/setPage");
      // 跳转 画布页面
    };
    // 预览画布
    let isShowPreview = ref(false);
    const getInitData = (id) => {
      selectBy({ id }).then((res) => {
        console.log(JSON.parse(res.data.elementjson))
        if (res.code === 200) {
          if (res.data.canvasStyleData) {//如果存在
            let canvasStyle = JSON.parse(res.data.canvasStyleData)
            commit("setCanvasName", { //画布属性
              id: canvasStyle.id,
              title: canvasStyle.title,
              type: canvasStyle.type,
              firstletter: canvasStyle.firstletter,
              width: canvasStyle.width,
              height: canvasStyle.height,
            });
          }
          // 组件属性渲染
          if (res.data.elementjson) {
            commit("setComponentData", JSON.parse(res.data.elementjson));
          }
          isShowPreview.value = true;
        }
      });
    };

    const searchPageData = (id) => {
      commit("deleteComponentAll");
      getInitData(id);
     
    };
    // 根据画布类型 处理画布尺寸
    const filtersCanvasSize = (val, type) => {
      let result = ''
      if (val == '1') {
        result = type == 'width' ? '2560' : '1080'
      } else {
        result = type == 'width' ? '1024' : '768'
      }
      return result;
    }
    // 添加画布
    const onSubmit = () => {
      formRef.value
        .validate()
        .then(async () => {
          sessionCache.remove("setCanvasName");
          sessionCache.remove("setComponentData");
          formState.firstletter = pinyin.getCamelChars(formState.title).charAt(0);
          // 保存名称
          commit("setCanvasName", {
            id: "",
            title: formState.title,
            type: formState.type,
            firstletter: formState.firstletter,
            width: filtersCanvasSize(formState.type, 'width'),
            height: filtersCanvasSize(formState.type, 'height'),
          });
          commit("deleteComponentAll");
          router.push("/setPage");

          // addList(formState).then((res) => {
          //   console.log(res);
          //   if (res.code == 200) {
          //      // 跳转 画布页面
          //     router.push({path:'/setPage',
          //       query:{
          //       }
          //     })
          //   }
          // });
        })
        .catch((error) => {
          console.log("error", error);
        });
    };
    // 关闭
    const cancel = () => {
      resetForm();
    };
    const resetForm = () => {
      formRef.value.resetFields();
    };
    // 格式化日期
    const timestampToTime = (timestamp) => {
      const date = new Date(timestamp);
      const commonTime =
        date.getFullYear() +
        "-" +
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) +
        "-" +
        (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) +
        " " +
        (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) +
        ":" +
        (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
        ":" +
        (date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds());
      return commonTime;
    };
    return {
      baseURL,
      WEBURL,
      isShowPreview,
      timestampToTime,
      projectList,
      zhCN,
      param,
      total,
      onChange,
      onSearchValue,
      addProject,
      mouseOver,
      mouseLeave,
      editCanvas,
      searchPageData,
      deletePageData,
      active,
      editPageData,
      editTitle,
      clickInput,
      blurInput,
      changeInput,
      handleChange,
      visible,
      onSubmit,
      formState,
      rules,
      formRef,
      cancel,
      positive,
      reverse,
      focusSearch,
      labelCol: { span: 5 },
      wrapperCol: { span: 17 },
      add,
      icon_project_title,
      icon_project_search,
      icon_project_edit,
      icon_project_del,
      bg_project_item,
    };
  },
};
</script>
<style scoped lang="less">
// @import '@/assets/mycss.less';
.flex {
  display: flex;
  align-items: center;
}
.flex_between {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.project {
  background: #0c1a33;
  padding: 45px 75px 45px 40px;
  // max-width: 1545px;
  max-width: 1260px;
  // min-width: 1240px;
  margin: 0 auto;
}
.inline {
  display: inline-block;
  vertical-align: bottom;
}
.gutter-example {
  min-height: 500px;
  min-width: 1170px;
  margin-bottom: 20px;
}
.project_header {
  // padding: 0 20px;
  margin-bottom: 20px;
  min-width: 1145px;
}
.project_header .project_header_title {
  font-size: 30px;
  font-weight: bold;
  color: #e6e6e6;
}
.project_header .project_header_title span {
  margin-left: 20px;
}
.project_header_search .order {
  margin-right: 20px;
}
.project_header_search i.line {
  margin: 0 10px;
  font-size: 20px;
  color: #808080;
}
.project_header_search span {
  font-size: 20px;
  font-weight: 400;
  color: #808080;
  cursor: pointer;
}
.project_header_search span:hover,
.project_header_search .focus {
  color: #3eaedd;
}
.gutter-box {
  width: 220px;
  // width: 273px;
  // min-width: 273px;
  height: 288px;
  background: red;
  padding: 8px 6px;
  background: #132a53;
  border: 1px solid #0561ae;
  border-radius: 8px;
  margin-bottom: 13px;
  margin-right: 14px;
}
.flex-wrap {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 30px 8px;
  // min-width: 273px;
}
.flex-wrap img {
  width: 83px;
  height: 83px;
}
.flex-wrap span {
  width: 100%;
  font-size: 22px;
  font-weight: 400;
  color: #f5f5f5;
  text-align: center;
}
.ant-input {
  height: 30px;
  width:100%;
}
.top {
  width: 100%;
  height: 145px;
  // height: 175px;
  // background: pink;
  position: relative;
}
.buttom {
  width: 100%;
  height: 100px;
  padding: 10px 0;
}
.action {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #f5f5f5;
  font-size: 18px;
  font-weight: 400;
  width: 100%;
}
.action .edit-title-box {
  width: 100%;
}
.action .title {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 85%;
  height: 30px;
  cursor: pointer;
}
.date {
  margin-top: 8px;
  font-size: 13px;
  font-weight: 400;
  color: #808080;
}
.address {
  margin-top: 8px;
  font-size: 13px;
  font-weight: 400;
  color: #808080;
  display: flex;
  align-items: baseline;
}
.address .label{
  flex: 0 0 65px
}
.address .center{
  width: calc(100% - 65px);
  word-break: break-word;
  line-height: 1.2;
}
.topHover {
  width: 100px;
  height: 38px;
  line-height: 38px;
  position: absolute;
  top: 20%;
  right: 0;
  transform: translate(0, -50%);
  background: #000000;
  opacity: 0.48;
  border-radius: 19px 0px 0px 19px;
  padding-left: 8px;
}
.topHover img {
  margin: 0 5px;
  cursor: pointer;
}
</style>
