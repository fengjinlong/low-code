<template>
    <div class="material">
      <div class="material_header flex_between">
          <div class="material_header_title flex">
            <img :src="icon_material_title" alt="">
            <span>素材库</span>
          </div>
          <div class="material_header_search flex">
            <div class="order">
              <span @click="positive" :class="focusSearch ? 'focus' : ''">正序</span>
              <i class="line">|</i>
              <span @click="reverse" :class="focusSearch == false ? 'focus' : ''">倒序</span>
            </div>
                <!-- :dropdownStyle="{width: '120px',border: '1px solid #0561AE',background: '#001426'}" -->
              <a-select
                ref="select"
                v-model:value="param.sortFeild"
                style="width: 120px;"
                @change="handleChange"
              >
                <a-select-option value="upload_date">上传时间</a-select-option>
                <a-select-option value="image_size">文件大小</a-select-option>
              </a-select>
                <!-- <a-upload
                  v-model:file-list="fileList"
                  name="file"
                  :multiple="false"
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  :headers="headers"
                  :show-upload-list="false"
                  :before-upload="beforeUpload"
                  @change="uploadChange"
                >
                  <a-button type="primary" size="default">
                    <upload-outlined></upload-outlined>
                    上传
                  </a-button>
                </a-upload> -->
          </div>
					
      </div>
      <div class="gutter-example">
          <div :gutter="16" >
            <!-- justify="space-between" -->
             <!-- :xs="12" :sm="12" :md="12" :lg="8" :xl="4" -->
              <div class="inline">
                  <div class="gutter-box flex-wrap">
                      <!-- :data="uploadData" -->
                    <a-upload
                      v-model:file-list="fileList"
                      name="file"
                      :multiple="true"
                      :action="`${baseURL}/materialinfo/upload`"
                      :headers="headers"
                      :show-upload-list="false"
                      :before-upload="beforeUpload"
                      @change="uploadChange"
                      :customRequest="customRequest"
                    >
                      <img :src="add" alt="">
                      <span>上传素材</span>
                    </a-upload>
                    <!-- <img :src="add" alt="">
                    <span>上传素材</span> -->
                  </div>
              </div>
              <div v-for="(item, i) in materialList" :key="i" class="inline">
                 <div class="gutter-box"  @mouseenter="mouseOver(i)" @mouseleave="mouseLeave(i)">
                    <div class="top">
                    <viewer :images="materialList">
                      <img :width="220" :height="220" :src="`${baseURL}/static/${item.imagePath}`">
                    </viewer>
                      <div v-if="active == i" class="hoverShow">
                        <div class="topHover">
                          <a-tooltip placement="bottom"  @click="() => setVisible(`${baseURL}/static/${item.imagePath}`)">
                            <template #title>
                              <span>预览</span>
                            </template>
                            <img :src="icon_material_search" alt="">
                          </a-tooltip>
                          <a-tooltip placement="bottom"  @click="deletePageData(item.id)">
                            <template #title>
                              <span>删除</span>
                            </template>
                            <img :src="icon_material_del" alt="">
                          </a-tooltip>
                        </div>
                      </div>
                 </div>
                </div>
              </div>
          </div>
      </div>
      <!-- 分页 -->
      <a-config-provider :locale="zhCN" >
        <a-pagination
          show-quick-jumper
          :total="total"
          :current="param.pageNum"
          :pageSize="param.pageSize"
          @change="onChange"
          size="small"
          style="text-align:center;"
          :show-total="(totalde) => `共 ${totalde} 条数据`"
        />
      </a-config-provider>
    </div>
</template>
<script>
import componentListData from "@/custom-component/left-components-data"; // 左侧列表数
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN' // 中文
import { deepCopy } from "@/utils/utils";
import { DeleteOutlined, EditOutlined,SearchOutlined } from "@ant-design/icons-vue";
import { effect, ref,reactive,getCurrentInstance, h  } from "vue";
import { useStore } from "vuex";
import { message, Modal } from "ant-design-vue";
import { getList, deleteList, selectBy, uploadmulti} from "@/request/material.js";
import baseURL from '@/request/env'
export default {
  components: {
    DeleteOutlined,
		EditOutlined,
		SearchOutlined
  },
  setup() {
		const { proxy } = getCurrentInstance()
		const active = ref(null); // hover
    const focusSearch = ref(false) // 判断正序倒序
    const current = ref(1); // 分页
    const add = require('@/assets/images/add.png')
    const icon_material_title = require('@/assets/images/icon_project_title.png')
    const icon_material_del = require('@/assets/images/icon_project_del.png')
    const icon_material_search = require('@/assets/images/icon_project_search.png')
    const total = ref(0); // 总条数
    const param = reactive({ // 列表查询参数
      pageNum: 1,
      pageSize: 14,
      sortType: 1, //排序类型 1、降序 2、升序
	    sortFeild: "upload_date", // 下拉选择 筛选数据
    });
    const materialList = ref([]);
    const getMaterialList = () => {
      console.log(param,'param.value')
      getList(param).then((res) => {
        if (res.code == 200) {
          materialList.value = res.data.data.lists
          total.value =  res.data.data.totalCount
        }
      });
    }
    getMaterialList();
    const onChange = pageNumber => {
      param.pageNum = pageNumber;
      getMaterialList();
      console.log('Page: ', pageNumber);
		};
		// 图片放大 预览
		const setVisible = (value, prevVisible) => {
      console.log(value, prevVisible,'----------')
      const data = [];
      data.push(value)
      const $viewer = proxy.$viewerApi({
        images: data
      })
    };

    // 移入
    const mouseOver = (i) => {
      if (active.value == i) {
        active.value = -1;
      } else {
        active.value = i
      }
    };
    // 移出
    const mouseLeave = () => {
     active.value = -1;
    };
    // 选择筛选条件
    const handleChange = (data) => {
      param.sortFeild = data;
      getMaterialList();
    };
    // 选择筛选条件 - 正序
    const positive = () => {
      focusSearch.value = true;
      param.sortType = 2;
      getMaterialList()
    };
    // 选择筛选条件 - 倒序
    const reverse = () => {
      focusSearch.value = false;
      param.sortType = 1;
      getMaterialList()
    };

    // 删除画布
    const deletePageData = (id) => {
      const param = {id: id}
      deleteList(param).then((res) => {
        if (res.code == 200) {
          getMaterialList();
          proxy.$message.success("删除成功");
        }
      });
    };

		const fileList = ref([]);
    const uploadChange = info => { 
      if (isUpload.value) {
        upload()
      }
        isUpload.value = false



      // if (info.file.status !== 'uploading') {
      //   console.log(info.file, info.fileList);
      // }
      // if (info.file.status === 'done') {
      //   proxy.$message.success(`${info.file.name} 上传成功`);
      //   getMaterialList();
      // } else if (info.file.status === 'error') {
      //   proxy.$message.error(`${info.file.name} 上传失败.`);
      // }
    };

    // 上传调接口
  const upload = () => {
    new Promise((resolve) => {
      const formData = new FormData();
      let SumSize = 0;
      let fileList = []
      let materialinfoList = []

      // formData.append("filelistjson", new Blob([JSON.stringify(files.value)], { 'type': 'application/json' }));
      // 输出所有的 value
      for (var i=0; i < files.value.length; i++) {
        SumSize += files.value[i].size
        formData.append("filelistjson", files.value[i]);
        materialinfoList.push(JSON.stringify({imageName:  files.value[i].name,imageSize:  files.value[i].size}))
      // formData.append("materialinfoList", JSON.stringify({imageName: files.value[i].name,imageSize: files.value[i].size}));
      }
      formData.append("materialinfoList", JSON.stringify(materialinfoList));
      console.log(formData,Buffer.from(files.value),'uploadData---------upload--')
      
      const fileCount = files.value.length > 100; // 文件数
      const fileNameLength = files.value.some(file => file.name.length > 100); // 文件名长度
      const fileSize = files.value.some(file => file.size / 1024 / 1024 >2); // 单个文件大小
      // 单个文件类型
      const fileType = files.value.some(file => {
        if (!(/(bmp|jpg|png|jpeg|tif|gif|pcx|tga|exif|fpx|svg|psd|cdr|pcd|dxf|ufo|eps|ai|raw|WMF|webp|avif|apng)/.test(file.name.toLowerCase()))) return true
      });
      const fileTotalSize = SumSize / 1024 / 1024 > 300; // 批量上传文件的总大小
      console.log(fileCount,fileNameLength,fileSize,fileTotalSize,'------------------------')
      if (fileCount) {
        proxy.$message.warning('文件数不能超过100');
        return
      }
      if (fileNameLength) {
        proxy.$message.warning('文件名长度不能超过100个字符');
        return
      }
      if (fileSize) {
        proxy.$message.warning('单个文件大小不能超过2MB');
        return
      }
      if (fileTotalSize) {
        proxy.$message.warning('文件总大小不能超过300MB');
        return
      }
      if (fileType) {
        proxy.$message.warning('文件上传格式不是正确');
        return
      }
      uploadmulti(formData).then((res) => {
        if (res.code == 200) {
          getMaterialList();
          proxy.$message.success("上传成功");
        } else if (res.code == 400) { //上传失败 展示错误信息
        if (res.data.errorList) {
          let errString = [];
          res.data.errorList.forEach(element => {
            errString.push(h("p", element.data.imageNameFull))
          });
          Modal.error({
            title: () =>
              h(
                "span",
                {
                  style: {
                    color: "#fff",
                  },
                },
                "上传失败"
              ),
            content: () =>
              h(
                "div",
                {
                  style: {
                    color: "#fff",
                  },
                },
                errString
              ),
          });
        }
         
        }
      }).catch((err) => {
        proxy.$message.error(err);
      });
    })


  }
    //通过覆盖默认的上传行为，可以自定义自己的上传实现
    const customRequest = (data) => {
    }

    const uploadData = reactive({
      materialinfo: {},
      filelist:[]
    })
    const files = ref([]); //多选 img list
    const isUpload = ref(true);
		const beforeUpload = (file, fileList) => {
      // console.log(event,'file***************')
      files.value = [...fileList];
      isUpload.value = true;
      const isJPG = file.name;

      // 格式验证
      const isJpgOrPng = /(bmp|jpg|png|jpeg|tif|gif|pcx|tga|exif|fpx|svg|psd|cdr|pcd|dxf|ufo|eps|ai|raw|WMF|webp|avif|apng)/.test(isJPG.toLowerCase());
      if (!isJpgOrPng) {
        message.error('上传格式不是正确!');
      }

      // const isLt2M = file.size / 1024 / 1024 < 2;
      // if (!isLt2M) {
      //   message.error('图像必须小于2MB!');
      // }
      // return isJpgOrPng && isLt2M;
      return isJpgOrPng;
    };
 
    return {
      customRequest,
      materialList,
			fileList,
			uploadChange,
			beforeUpload,
			headers: {
        authorization: 'authorization-text',
      },
      uploadData,
      setVisible,
      zhCN,
      param,
      total,
      onChange,
      mouseOver,
			mouseLeave,
			deletePageData,
			active,
      handleChange,
      positive,
      reverse,
      focusSearch,
      add,
      icon_material_title,
      icon_material_search,
      icon_material_del,
      baseURL
    };
  }
};
</script>
<style scoped>
.flex {
	display: flex;
  align-items: center;
  widows: 100%;
}
.flex_between {
	display: flex;
	align-items: center;
  justify-content: space-between;
}
.material {
  background: #0c1a33;
  padding: 45px 75px 45px 40px;
  /* max-width: 1470px;
  min-width: 1240px; */
  max-width: 1290px;
  margin: 0 auto;
}
.inline {
  display: inline-block;
  vertical-align: bottom;
}
.material_header {
  /* padding: 0 20px; */
  margin-bottom: 20px;
  min-width: 1170px;
}
.material_header .material_header_title {
  font-size: 30px;
  font-weight: bold;
  color: #E6E6E6;
}
.material_header .material_header_title span {
  margin-left: 20px;
}
.material_header_search .order{
  margin-right: 20px;
}
.material_header_search i.line{
  margin: 0 10px;
  font-size: 20px;
  color: #808080;
}
.material_header_search span{
  font-size: 20px;
  font-weight: 400;
  color: #808080;
  cursor: pointer;
}
.material_header_search span:hover,
.material_header_search .focus{
  color: #3EAEDD;
}
.gutter-example {
  min-height:500px;
  min-width: 1190px;
  margin-bottom: 20px;
}
.gutter-box {
  width: 220px;
  height: 212px;
  background: red;
  background: #132A53;
  border: 1px solid #0561AE;
  border-radius: 8px;
	margin-bottom: 15px;
	overflow: hidden;
  margin-right: 18px;
}
.flex-wrap {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 30px 8px;
}
.flex-wrap img{
  width: 83px;
  height: 83px;
}
.flex-wrap span{
  width: 100%;
  font-size: 22px;
  font-weight: 400;
  color: #F5F5F5;
  text-align: center;
  display: block;
  margin-top: 14px;
}

.top {
  width: 100%;
  height: 212px;
  /* background: pink; */
	position: relative;
}
.hoverShow {
	width: 100%;
	height: 100%;
	position: absolute;
	top:0;
	background: rgba(0,0,0,.15);
}
.topHover {
    width: 100px;
    height: 38px;
    line-height: 38px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #000000;
    opacity: 0.48;
    border-radius: 20px;
    padding-left: 8px;
}
.topHover img{
  margin: 0 10px;
  cursor: pointer;
}
:deep(.ant-image-img){
  height: 100%;
}
</style>
