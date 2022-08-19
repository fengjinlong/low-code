<template>
    <div class="project">
			<a-upload
				v-model:file-list="fileList"
				name="file"
				:multiple="true"
				action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
				:headers="headers"
				@change="handleChange"
			>
				<a-button>
					<upload-outlined></upload-outlined>
					上传
				</a-button>
			</a-upload>
			<a-tabs v-model:activeKey="activeKey" @change="changeTabs">
					<a-tab-pane key="1" tab="图片">
                        <a-row :gutter="16">
							<a-col :xs="6" :sm="6" :md="6" :lg="6" :xl="4">
								<a-image
									:width="200"
									src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
									>
									<template #placeholder>
										<a-image
											src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200"
											:width="200"
											:preview="false"
										/>
									</template>
								</a-image>
							</a-col>
                        </a-row>
					</a-tab-pane>
					<a-tab-pane key="2" tab="视频" force-render>Content of Tab Pane 2</a-tab-pane>
			</a-tabs>

				<code-editor v-model:value="textarea1" :scene="type" height-size="500"></code-editor>
    </div>
</template>
<script>
import { useStore } from "vuex";
import componentListData from "@/custom-component/left-components-data"; // 左侧列表数

import { deepCopy } from "@/utils/utils";
import { DeleteOutlined, EditOutlined,SearchOutlined, UploadOutlined  } from "@ant-design/icons-vue";
import { effect, ref, reactive,nextTick,onMounted } from "vue";
import {VAceEditor} from 'vue3-ace-editor'
import codeEditor from './code.vue'


export default {
  components: {
    DeleteOutlined,
    EditOutlined,
		SearchOutlined,
		UploadOutlined,
		VAceEditor,
		codeEditor
  },
  setup() {
		const activeKey = ref(false); // tabs切换
		const view = ref(); // tabs切换
		const textarea = ref('oooooo');
		const type = ref('add');
		const textarea1 = ref('');
		const data = 	[{
											"y1": 8,
											"x": "一月",
											"y2": 2,
											"y3": 9
									},
									{
											"x": "二月",
											"y1": 2,
											"y2": 3,
											"y3": 6
									},
									{
											"x": "三月",
											"y1": 8,
											"y2": 4,
											"y3": 3
									},
							];
				textarea1.value = JSON.stringify(data, null, "\t")
				console.log(textarea1.value,'00000000000000')	
   const initEditor = (ed) => {
		//  var editor = VAceEditor.edit("editor");
        // ed.session.setMode("ace/mode/xml");
        // ed.setTheme("brace/theme/ambiance");
      // console.log(ed)
      // require('brace/ext/language_tools') // language extension prerequsite...
      // require('brace/mode/html')
      // require('brace/mode/javascript') // language
      // require('brace/mode/less')
      // require('brace/mode/json')
      // require('brace/mode/xml')
      // require('brace/mode/yaml')
      // require('brace/mode/text')
      // require('brace/mode/properties')
      // require('brace/ext/emmet')
      // require('brace/theme/chrome')
      // require('ace/ext/language_tools')

      // require('brace/snippets/javascript')
      // require('brace/snippets/json')
      // require('brace/snippets/text')
      // require('brace/snippets/yaml')
      // require('brace/snippets/xml')
      // require('brace/snippets/properties')
      // ed.setReadOnly(true)
      // ed.setShowPrintMargin(false)
      // ed.setOptions({
      //   enableBasicAutocompletion: true,
      //   enableSnippets: true,
      //   enableLiveAutocompletion: true
      // })
    };
    // tab切换
    const changeTabs = (tab) => {
         console.log(tab, '000')
    };
    // 删除画布
    const deletePageData = () => {
    };
    // 预览画布
    const searchPageData = () => {
    
		};
    const fileList = ref([]);
    const handleChange = info => {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }

      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    };
    return {
			activeKey,
			changeTabs,
			searchPageData,
			deletePageData,
			handleChange,
			fileList,
			headers: {
        authorization: 'authorization-text',
      },
			handleChange,
			initEditor,
			textarea1,
			view,
			cmOptions: {
					tabSize: 4,// tab的空格个数
					theme: 'dracula',//主题样式
					lineNumbers: true,//是否显示行数
					lineWrapping: true, //是否自动换行
					styleActiveLine: true,//line选择是是否加亮
					matchBrackets: true,//括号匹配
					mode: "vue", //实现javascript代码高亮
					readOnly: false//只读
			 }
    };
  }
};
</script>
<style scoped>
.flex {
	display: flex;
	align-items: center;
}
.gutter-box {
  width: 100%;
  height: 400px;
  background: red;
  padding: 10px;
}
.top {
  width: 100%;
  height: 200px;
  background: pink;
	position: relative;
}
.buttom {
  width: 100%;
  height: 100px;
  background: yellow;
}
.action {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.topHover {
	width: 100px;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}
</style>
