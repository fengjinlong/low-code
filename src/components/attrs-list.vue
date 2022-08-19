<template>
  <div class="attr-list">
    <a-tabs
      :tab-position="mode"
      :tabBarStyle="{textAlign:'center',color:'#B2B2B2'}"
      v-model:activeKey="activeKey"
    >
      <a-tab-pane v-for="(val, key,i) in attrList" :key="i" >
        <!-- 属性分类 -->
        <template #tab>
          <span>
            <a-tooltip placement="left">
              <template #title>
                <span>{{lableFilter(key)}}</span>
              </template>
                <template v-if="key == 'style'">
                   <img v-if="i == activeKey" :src="icon_style_checked" class="iconImg" alt="">
                   <img v-else :src="icon_style" class="iconImg" alt="">
                </template>
                <template v-if="key == 'series'">
                   <img v-if="i == activeKey" :src="icon_bar_checked" class="iconImg" alt="">
                   <img v-else :src="icon_bar" class="iconImg" alt="">
                </template>
                <template v-if="key == 'title'">
                   <img v-if="i == activeKey" :src="icon_title_checked" class="iconImg" alt="">
                   <img v-else :src="icon_title" class="iconImg" alt="">
                </template>
                <template v-if="key == 'number'">
                   <img v-if="i == activeKey" :src="icon_number_checked" class="iconImg" alt="">
                   <img v-else :src="icon_number" class="iconImg" alt="">
                </template>
                <!-- <apple-outlined /> -->
                <!-- <AppstoreAddOutlined v-if="key == 'style'"/>
                <BookOutlined v-else-if="key == 'title'"/>
                <BarChartOutlined v-else-if="key == 'number'" /> -->
                <!-- <project-outlined/> -->
                <!-- <img v-if="i == activeKey" :src="icon_bg" alt="">
                <ProfileOutlined  v-else/> -->
            </a-tooltip>
          </span>
        </template>
        <!-- 各项数据展示 -->
        <a-form :label-col="labelCol" class="params">
            <!-- 系列 -->
            <template v-if="key == 'series'">
              <div>
                <seriesIndex :seriesList="val"/>
              </div>
            </template>
            <!-- 基础样式 -->
            <template v-else-if="key == 'style'">
              <div>
                <a-form :model="val" :label-col="labelCol">
                  <a-form-item label="组件标题">
                    <a-input v-model:value="val.name" />
                  </a-form-item>
                  <a-form-item label="组件尺寸">
                    <a-row>
                      <a-col :span="10">
                        <a-input-number :disabled="isLock ? true : false" type="number" v-model:value="val.width" />
                      </a-col>
                      <a-col :span="4">
                        <img :src="icon_relevance" class="line" alt="">
                      </a-col>
                      <a-col :span="10">
                        <a-input-number :disabled="isLock ? true : false" type="number" v-model:value="val.height" />
                      </a-col>
                    </a-row>      
                  </a-form-item>
                  <a-form-item label="组件位置">
                    <a-row>
                      <a-col :span="10">
                         <a-input-number :disabled="isLock ? true : false" type="number" v-model:value="val.left" />
                      </a-col>
                      <a-col :span="4">
                        <img :src="icon_relevance" class="line" alt="">
                      </a-col>
                      <a-col :span="10">
                          <a-input-number :disabled="isLock ? true : false" type="number" v-model:value="val.top" />
                      </a-col>
                    </a-row>
                  </a-form-item>
                  <a-form-item label="旋转角度">
                    <a-row>
                      <a-col :span="15">
                        <a-slider v-model:value="val.rotate"  :min="0" :max="360" />
                      </a-col>
                      <a-col :span="1">
                        <a-input-number v-model:value="val.rotate" :min="0" :max="360" style="width:65px; margin-left: 10px" />
                      </a-col>
                    </a-row>
                  </a-form-item>
                  <a-form-item label="透明度">
                    <a-row>
                      <a-col :span="15">
                        <a-slider v-model:value="val.opacity"  :min="0" :max="1" :step="0.01"/>
                      </a-col>
                      <a-col :span="1">
                        <a-input-number v-model:value="val.opacity" :min="0" :max="1" style="width:65px; margin-left: 10px" />
                      </a-col>
                    </a-row>
                  </a-form-item>
                  <a-form-item label="边框">
                    <a-row>
                      <a-col :span="10">
                        <div class="border_box">
                          <div class="frame"></div>
                          <div :class="val.borderTop ? 'child_box top active' : 'child_box top'" @click="borderClick(val,'top')"></div>
                          <div :class="val.borderBottom ? 'child_box bottom active' : 'child_box bottom'" @click="borderClick(val,'bottom')"></div>
                          <div :class="val.borderLeft ? 'child_box left active' : 'child_box left'" @click="borderClick(val,'left')"></div>
                          <div :class="val.borderRight ? 'child_box right active': 'child_box right'" @click="borderClick(val,'right')"></div>
                        </div>
                      </a-col>
                      <a-col :span="14">
                        <a-input-number v-model:value="val.borderWidth" :min="0" style="width:70px; margin-bottom: 10px; margin-right: 10px" />
                        <!-- <a-input type="color" style="width:40px;height:32px;margin-left:9px;" v-model:value="val.borderColor" /> -->
                         <color-picker style="width:80px;" pickerType="chrome" :disableHistory="true" v-model:pureColor="val.borderColor" v-model:gradientColor="gradientColor"/> 
                        <a-select
                          v-model:value="val.borderType"
                          placeholder="请选择类型"
                        >
                          <a-select-option v-for="(v, k) in borderTypeList" :key="k" :value="v.value">{{v.lable}}</a-select-option>
                        </a-select>
                      </a-col>
                    </a-row>
                  </a-form-item>
                  <a-form-item label="圆角">
                    <a-row type="flex" justify="space-around">
                      <a-col :span="10">
                        <div class="flex-around">
                          <span class="radiusBox radiusTopLeftText"></span>
                          <a-input type="number" v-model:value="val.borderTopLeftRadius" style="width:55px;"/>
                        </div>
                        <div class="flex-around">
                          <span class="radiusBox radiusBottomLeftText"></span>
                          <a-input type="number" v-model:value="val.borderBottomLeftRadius" style="width:55px;" />
                        </div>
                      </a-col>
                      <a-col :span="4">
                        <img :src="icon_relevance" class="radiusLine" alt="">
                      </a-col>
                      <a-col :span="10">
                        <div class="flex-around">
                          <a-input type="number" v-model:value="val.borderTopRightRadius" style="width:55px;" />
                          <span class="radiusBox radiusTopRightText"></span>
                        </div>
                        <div class="flex-around">
                          <a-input type="number" v-model:value="val.borderBottomRightRadius" style="width:55px;" />
                         <span class="radiusBox radiusBottomRightText"></span>
                        </div>
                      </a-col>
                    </a-row>      
                  </a-form-item>
                  <a-form-item label="背景图">
                    <img :src="val.backgroundImage ? val.backgroundImage : icon_bg" alt="" width="100" style="cursor: pointer;" @click="showBgList = true" />     
                    <img v-show="val.backgroundImage" :class="val.backgroundImage ? 'icon_project_del' : ''" :src="icon_project_del" alt=""  @click="removeBgImg"/>
                  </a-form-item>
                  <a-form-item label="背景色">
                   <!-- <a-input type="color" style="width:40px;" v-model:value="val.backgroundColor" />      -->
                    <color-picker pickerType="chrome" :disableHistory="true" v-model:pureColor="val.backgroundColor" v-model:gradientColor="gradientColor"/>
                  </a-form-item>
                  <!-- <a-form-item label="">
                    <a-row>
                      <a-col :span="8">
                         <a-select
                            v-model:value="val.backgroundType"
                            @change="backgroundChange"
                            placeholder="请选择类型"
                          >
                            <a-select-option value="color">背景色</a-select-option>
                            <a-select-option value="image">背景图</a-select-option>
                          </a-select>
                      </a-col>
                      <a-col :span="12">
                        <a-input v-if="val.backgroundType == 'color'" type="color" v-model:value="val.backgroundColor" />
                        <img v-if="val.backgroundType == 'image'" :src="icon_bg" alt="" @click="showMaterial">
                      </a-col>
                    </a-row>      
                  </a-form-item> -->
                  <a-form-item v-if="val.backgroundSize" label="图片重复">
                    <a-select
                      v-model:value="val.backgroundSize"
                      placeholder="请选择类型"
                    >
                      <a-select-option value='100% 100%'>全部填充</a-select-option>
                    </a-select>
                  </a-form-item>
                  <a-form-item label="阴影">
                    <a-row>
                      <a-col :span="6">
                        <a-input-number v-model:value="val.boxShadowX" />
                        <span class="radiusText">X</span>
                      </a-col>
                      <a-col :span="6">
                        <a-input-number v-model:value="val.boxShadowY" />
                        <span class="radiusText">Y</span>
                      </a-col>
                      <a-col :span="6">
                        <a-input-number v-model:value="val.boxShadowM" />
                        <span class="radiusText">模糊</span>
                      </a-col>
                      <a-col :span="6">
                        <a-input-number v-model:value="val.boxShadowC" />
                        <span class="radiusText">尺寸</span>
                      </a-col>
                    </a-row>      
                  </a-form-item>
                  <a-form-item label="阴影颜色">
                   <!-- <a-input type="color" style="width:40px;" v-model:value="val.backgroundColor" />      -->
                    <color-picker pickerType="chrome" :disableHistory="true" v-model:pureColor="val.boxShadowColor" v-model:gradientColor="gradientColor"/>
                  </a-form-item>

                  <a-form-item v-if="val.componentStyle&&val.componentStyle.flexFlow" label="排列方式">
                    <a-radio-group v-model:value="val.componentStyle.flexFlow" button-style="solid" size="small" >
                      <a-radio-button value="1">垂直</a-radio-button>
                      <a-radio-button value="2">水平</a-radio-button>
                      <a-radio-button value="3">反转</a-radio-button>
                      <a-radio-button value="4">上下</a-radio-button>
                      <!-- <a-radio-button value="column/wrap">垂直</a-radio-button>
                      <a-radio-button value="row/nowrap">水平</a-radio-button>
                      <a-radio-button value="column-reverse/wrap">反转</a-radio-button>
                      <a-radio-button value="row/wrap">上下</a-radio-button> -->
                    </a-radio-group>   
                  </a-form-item>
                  <a-form-item v-if="val.componentStyle&&val.componentStyle.textAlign" label="对齐方式">
                    <a-radio-group v-model:value="val.componentStyle.textAlign" button-style="solid" size="small" >
                      <a-radio-button value="left">左</a-radio-button>
                      <a-radio-button value="center">居中</a-radio-button>
                      <a-radio-button value="right">右</a-radio-button>
                    </a-radio-group>   
                  </a-form-item>
                </a-form>
              </div>
            </template>
            <div v-else v-for="(item, label, index) in val" :key="index">
              <!-- 判断是否是对象 -->
              <template v-if="isObj(val[label])&& key !== 'series'">
                <div>
                  <!-- 循环渲染 -->
                  <a-collapse expandIconPosition="right">
                    <a-collapse-panel :key="index" :header="lableFilter(label)">
                      <div v-for="(value, la, j) in val[label]" :key="j">
                        <a-form-item
                          :label="lableFilter(la)"
                        >
                          <a-switch v-if="la=='show' || la=='inverse' || la=='boundaryGap' || la=='alignWithLabel'" v-model:checked="val[label][la]" />
                          <a-select
                            ref="select"
                            v-else-if="la=='fontFamily'"
                            v-model:value="val[label][la]"
                          >
                            <a-select-option v-for="(v, k) in fontFamilyList" :key="k" :value="v.value">{{v.lable}}</a-select-option>
                          </a-select>
                          <!-- fontWeight单选 -->
                          <a-radio-group  v-else-if="la=='fontWeight'" v-model:value="val[label][la]" button-style="solid" size="small">
                            <a-radio-button value="normal">普通</a-radio-button>
                            <a-radio-button value="bold">加粗</a-radio-button>
                            <a-radio-button value="lighter">更细</a-radio-button>
                          </a-radio-group>
                          <!-- x/y轴 标签对齐方式 单选 echarts数据为反数据-->
                          <a-radio-group v-else-if="la=='align'" v-model:value="val[label][la]" button-style="solid" size="small">
                            <a-radio-button value="left">右</a-radio-button>
                            <a-radio-button value="center">中</a-radio-button>
                            <a-radio-button value="right">左</a-radio-button>
                          </a-radio-group>
                          <!-- x/y轴 旋转角度 -->
                          <a-row v-else-if="la == 'rotate'">
                            <a-col :span="15">
                              <a-slider v-model:value="val[label][la]"  :min="0" :max="360" />
                            </a-col>
                            <a-col :span="1">
                              <a-input-number v-model:value="val[label][la]" :min="0" :max="360" style="width:60px; margin-left: 1px" />
                            </a-col>
                          </a-row>
                           <!-- 三级对象工具栏 -->
                          <template v-else-if="isObj(val[label][la])">
                              <div v-for="(v, l, n) in val[label][la]" :key="n">
                              <a-switch v-if="l=='show'" v-model:checked="val[label][la][l]" />
                              <a-form-item
                                v-else
                                :label="lableFilter(l)"
                              >
                              <!-- 文本输入框 -->
                              <a-input
                                v-if="l=='name' || l=='text' || l=='link' || l=='subtext' || l=='sublink'"
                                v-model:value="val[label][la][l]"
                              />
                              <!-- 颜色选择器 -->
                              <!-- <a-input
                                v-else-if="l=='color' || l=='backgroundColor' || l=='borderColor' || l=='shadowColor' || l=='pageIconColor' || l=='pageIconInactiveColor'"
                                style="width:40px;"
                                type="color"
                                v-model:value="val[label][la][l]"
                              /> -->
                               <color-picker v-else-if="l=='color' || l=='backgroundColor' || l=='borderColor' || l=='shadowColor' || l=='pageIconColor' || l=='pageIconInactiveColor'" pickerType="chrome" :disableHistory="true" v-model:pureColor="val[label][la][l]" v-model:gradientColor="gradientColor"/>
                              <!-- 轴线类型 -->
                              <a-radio-group v-else-if="l=='type'" v-model:value="val[label][la][l]" button-style="solid" size="small">
                                <a-radio-button value="solid">实线</a-radio-button>
                                <a-radio-button value="dashed">虚线</a-radio-button>
                                <a-radio-button value="dotted">点状线</a-radio-button>
                              </a-radio-group>
                              <!-- fontWeight单选 -->
                              <!-- <a-radio-group  v-else-if="l=='fontWeight'" v-model:value="val[label][la][l]" button-style="solid" size="small">
                                <a-radio-button value="normal">普通</a-radio-button>
                                <a-radio-button value="bold">加粗</a-radio-button>
                                <a-radio-button value="lighter">更细</a-radio-button>
                             </a-radio-group> -->
                              <a-input
                                v-else
                                type="number"
                                v-model:value="val[label][la][l]"
                              />
                              </a-form-item>
                            </div>
                          </template>
                           <!-- 文本输入框 -->
                          <a-input
                            v-else-if="la=='content' || la=='name' || la=='text' || la=='link' || la=='subtext' || la=='sublink'"
                            v-model:value="val[label][la]"
                          />
                          <!-- 颜色选择器 -->
                          <!-- <a-input
                            v-else-if="la=='color' || la=='backgroundColor' || la=='borderColor' || la=='shadowColor' || la=='pageIconColor' || la=='pageIconInactiveColor'"
                            style="width:40px;"
                            type="color"
                            v-model:value="val[label][la]"
                          /> -->
                           <color-picker v-else-if="la=='color' || la=='backgroundColor' || la=='borderColor' || la=='shadowColor' || la=='pageIconColor' || la=='pageIconInactiveColor'" pickerType="chrome" :disableHistory="true" v-model:pureColor="val[label][la]" v-model:gradientColor="gradientColor"/>
                          <a-input
                            v-else
                            type="number"
                            v-model:value="val[label][la]"
                          />
                        </a-form-item>
                      </div>
                      <!-- <a-form-item
                        :label="lableFilter(label)"
                      >
                        <a-input
                          v-model:value="val[label]"
                        />
                      </a-form-item> -->
                    </a-collapse-panel>
                  </a-collapse>
                </div>
              </template>
              <template v-else-if="key == 'grid' && (label=='top' || label=='bottom' || label=='left'|| label=='right' )">
                <div>
                  <a-form-item
                    :label="lableFilter(label)"
                  >
                    <a-radio-group @change="gridRadioChange($event,val,label)" :defaultValue="val[label].toString().split('%').pop() == ''? '2' : '1'" button-style="solid" >
                      <a-radio-button value="1">绝对值</a-radio-button>
                      <a-radio-button value="2">百分比</a-radio-button>
                    </a-radio-group>
                    <a-input
                      style="margin-top:5px;"
                      v-model:value="val[label]"
                    />
                  </a-form-item>
                </div>
              </template>
              <!-- 一层数据渲染 -->
              <template v-else>
                <div>
                  <a-form-item
                    :label="lableFilter(label)"
                  >
                    <!-- 开关 -->
                    <a-switch v-if="label=='show' || label=='inverse' || label=='boundaryGap'" v-model:checked="val[label]" />
                    <!-- 下拉框 -->
                    <a-select
                      ref="select"
                      v-else-if="label=='fontFamily'"
                      v-model:value="val[label]"
                      >
                      <a-select-option v-for="(v, k) in fontFamilyList" :key="k" :value="v.value">{{v.lable}}</a-select-option>
                    </a-select>
                    <!-- 图例 icon下拉框 -->
                    <a-select
                      ref="select"
                      v-else-if="label=='icon'"
                      v-model:value="val[label]"
                      >
                      <a-select-option v-for="(v, k) in iconList" :key="k" :value="v.value">{{v.lable}}</a-select-option>
                    </a-select>
                    <!-- xAxis单选 -->
                    <a-radio-group v-else-if="key == 'xAxis' && label=='position'" v-model:value="val[label]" button-style="solid" size="small" >
                      <a-radio-button value="top">上</a-radio-button>
                      <a-radio-button value="bottom">下</a-radio-button>
                    </a-radio-group>
                    <!-- yAxis单选 -->
                    <a-radio-group v-else-if="key == 'yAxis' && label=='position'" v-model:value="val[label]" button-style="solid" size="small" >
                      <a-radio-button value="left">左</a-radio-button>
                      <a-radio-button value="right">右</a-radio-button>
                    </a-radio-group>
                    <!-- 坐标轴名称位置单选 -->
                    <a-radio-group v-else-if="label=='nameLocation'" v-model:value="val[label]" button-style="solid" size="small">
                      <a-radio-button value="start">开端</a-radio-button>
                      <a-radio-button value="center">中端</a-radio-button>
                      <a-radio-button value="end">末端</a-radio-button>
                    </a-radio-group>
                    <!-- 图例图标位置单选 -->
                    <a-radio-group v-else-if="label=='align'" v-model:value="val[label]" button-style="solid" size="small">
                      <a-radio-button value="auto">自适应</a-radio-button>
                      <a-radio-button value="left">左</a-radio-button>
                      <a-radio-button value="right">右</a-radio-button>
                    </a-radio-group>
                    <!-- 图例-普通、滚动单选 -->
                    <a-radio-group v-else-if="label=='type'" v-model:value="val[label]" button-style="solid" size="small">
                      <a-radio-button value="plain">普通图例</a-radio-button>
                      <a-radio-button value="scroll">翻页图例</a-radio-button>
                    </a-radio-group>
                    <!-- 图例-布局方式 -->
                    <a-radio-group v-else-if="label=='orient'" v-model:value="val[label]" button-style="solid">
                      <a-radio-button value="horizontal">水平</a-radio-button>
                      <a-radio-button value="vertical">垂直</a-radio-button>
                    </a-radio-group>
                    <!-- 提示框-出发类型 -->
                    <a-radio-group v-else-if="label=='trigger'" v-model:value="val[label]" button-style="solid">
                      <a-radio-button value="axis">坐标轴</a-radio-button>
                      <a-radio-button value="item">数据项</a-radio-button>
                    </a-radio-group>
                      <!-- fontWeight单选 -->
                    <a-radio-group  v-else-if="label=='fontWeight'" v-model:value="val[label]" button-style="solid" size="small">
                      <a-radio-button value="normal">普通</a-radio-button>
                      <a-radio-button value="bold">加粗</a-radio-button>
                      <a-radio-button value="lighter">更细</a-radio-button>
                    </a-radio-group>
                    <!-- 水平对齐位置单选 -->
                    <template v-else-if="label=='left'">
                      <div>
                        <a-radio-group @change="leftRadioChange($event,val,label)" :defaultValue="leftRadio(val[label])" button-style="solid" size="small">
                          <a-radio-button value="1">对齐</a-radio-button>
                          <a-radio-button value="2">绝对值</a-radio-button>
                          <a-radio-button value="3">百分比</a-radio-button>
                        </a-radio-group>

                        <a-radio-group v-if="leftRadio(val[label]) == '1'" v-model:value="val[label]" button-style="solid" size="small" style="margin-top:5px;">
                          <a-radio-button value="left">左</a-radio-button>
                          <a-radio-button value="center">中</a-radio-button>
                          <a-radio-button value="right">右</a-radio-button>
                        </a-radio-group>
                        <a-input
                          v-else
                          style="margin-top:5px;"
                          v-model:value="val[label]"
                        />
                      </div>
                    </template>
                    <!-- 水平对齐位置单选 -->
                    <template v-else-if="label=='top'">
                      <div>
                        <a-radio-group @change="topRadioChange($event,val,label)" :defaultValue="topRadio(val[label])" button-style="solid" size="small">
                          <a-radio-button value="1">对齐</a-radio-button>
                          <a-radio-button value="2">绝对值</a-radio-button>
                          <a-radio-button value="3">百分比</a-radio-button>
                        </a-radio-group>

                        <a-radio-group v-if="topRadio(val[label]) == '1'" v-model:value="val[label]" button-style="solid" size="small" style="margin-top:5px;">
                          <a-radio-button value="top">上</a-radio-button>
                          <a-radio-button value="middle">中</a-radio-button>
                          <a-radio-button value="bottom">下</a-radio-button>
                        </a-radio-group>
                        <a-input
                          v-else
                          style="margin-top:5px;"
                          v-model:value="val[label]"
                        />
                      </div>
                    </template>
                    <!-- 文本输入框 -->
                    <a-input
                      v-else-if="label=='content' || label=='name' || label=='text' || label=='link' || label=='subtext' || label=='sublink'"
                      v-model:value="val[label]"
                    />
                    <!-- 颜色选择器 -->
                    <!-- <a-input
                      v-else-if="label=='color' || label=='backgroundColor' || label=='borderColor' || label=='shadowColor' || label=='pageIconColor' || label=='pageIconInactiveColor'"
                      style="width:40px;"
                      type="color"
                      v-model:value="val[label]"
                    /> -->
                    <color-picker  v-else-if="label=='color' || label=='backgroundColor' || label=='borderColor' || label=='shadowColor' || label=='pageIconColor' || label=='pageIconInactiveColor'" pickerType="chrome" :disableHistory="true" v-model:pureColor="val[label]" v-model:gradientColor="gradientColor"/>
                    <!-- 数字输入框 -->
                    <a-input
                      v-else
                      type="number"
                      v-model:value="val[label]"
                    />
                  </a-form-item>
                </div>
              </template>
            </div>
        </a-form>
      </a-tab-pane>
    </a-tabs>
    <!-- 选择背景图片 -->
    <CanvasBgList v-model="showBgList" @setBg="setBg" />
  </div>
</template>
<script>
import { ProfileOutlined,BookOutlined,AppleOutlined, AndroidOutlined,AppstoreAddOutlined,BarChartOutlined } from '@ant-design/icons-vue';
import { defineComponent, ref, computed, watch } from 'vue';
import { attrNameData } from "@/utils/attrNameData";
import seriesIndex from "./SeriesList/series-index";
import CanvasBgList from "./canvas-bgList.vue";
import { useStore } from "vuex";
import { filter } from 'minimatch';
import baseURL from "@/request/env";
export default {
  components: {
     AppleOutlined,
     seriesIndex,
     AppstoreAddOutlined,
     BarChartOutlined,
     BookOutlined,
     ProfileOutlined,
     CanvasBgList
  },
  props: {
    attrList: {
      type: Object,
      default: {}
    }
  },
  setup(props) {
    const mode = ref('left');
    const activeKey = ref(0);
    const gradientColor = ref("linear-gradient(0deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 100%)");
    const icon_bg = require('@/assets/images/icon_bg.png')
    const icon_relevance = require('@/assets/images/icon_relevance.png')
    const icon_style_checked = require('@/assets/images/icon_style_checked.png')
    const icon_style = require('@/assets/images/icon_style.png')
    const icon_bar_checked = require('@/assets/images/icon_bar_checked.png')
    const icon_bar = require('@/assets/images/icon_bar.png')
    const icon_title_checked = require('@/assets/images/icon_title_checked.png')
    const icon_title = require('@/assets/images/icon_title.png')
    const icon_number_checked = require('@/assets/images/icon_number_checked.png')
    const icon_number = require('@/assets/images/icon_number.png')
    const icon_project_del = require("@/assets/images/icon_project_del.png");
    const { state, commit } = useStore(); 
    const isLock = computed(() => { // 判断是否锁定
      if (state.curComponent && state.curComponent.isLock) {
        return state.curComponent.isLock;
      }
    });
    watch(() => props.attrList, ()=> {
      activeKey.value = 0;
    })
    const borderTypeList = ref([
      { value: 'solid', lable:'实线'}, 
      { value: 'dashed', lable:'虚线'}, 
      { value: 'dotted', lable:'点状线'}, 
    ])
    const fontFamilyList = ref([
      { value: 'Microsoft YaHei', lable:'微软雅黑'}, 
      { value: 'SimHei', lable:'黑体'}, 
      { value: 'SimSun', lable:'宋体'}, 
      { value: 'KaiTi', lable:'楷体'}, 
      { value: 'FangSong', lable:'仿宋'}
    ])
    const iconList = ref([
      {value: 'circle', lable: '圆形'},
      {value: 'rect', lable: '矩形'},
      {value: 'roundRect', lable: '圆矩形'},
      {value: 'triangle', lable: '三角形'},
      {value: 'diamond', lable: '菱形'},
      {value: 'pin', lable: '针形'},
      {value: 'arrow', lable: '箭头形'},
      {value: 'none', lable: '取消图标'}
    ])
    // 背景色、背景图 展示判断
    const colorOrImage = ref(false);
    // 显示素材库弹窗
    const showBgList = ref(false);
    // 设置背景图
    const setBg = (imgName) => {
      colorOrImage.value = true;
      commit("setStyleBg", `${baseURL}/static/${imgName}`);
    };
    // 清除背景图
    const removeBgImg = () => {
      commit("removeStyleBg");
    }
    const gridRadio = ref('1')
    const gridRadioChange = (e,val,label) => {
      // console.log(e,label)
      // 绝对值
      if (e.target.value == '1') {
        val[label] = val[label].toString().split('%').shift();
      } else { // 百分比
        val[label] = val[label] +'%'
      }
    }
    const defaultVal1 = ref('center')
    const defaultVal2 = ref('')
    const defaultVal3 = ref('')
    const leftRadioChange = (e,val,label) => {
      // console.log(e,label,val[label])
      if (leftRadio(val[label]) == '1') {
        defaultVal1.value = val[label]; //存储初始数据
      } else {
        defaultVal2.value = val[label];
      }
      if (e.target.value == '2') { // 绝对值
        val[label] = defaultVal2.value.toString().split('%').shift();

      } else if (e.target.value == '3') { // 百分比
        if (defaultVal2.value.indexOf('%') != -1) {
          val[label] = defaultVal2.value;
        } else {
          val[label] = defaultVal2.value +'%';
        }

      } else {
        val[label] = defaultVal1.value

      }
    }
    const leftRadio = (val) => {
      if (RegExp(/(left|center|right)/).test(val)){
        return '1'
      }else if (RegExp(/(%)/).test(val)) {
        return '3'
      }else {
        return '2'
      }
    }
    const topDefaultVal1 = ref('middle')
    const topDefaultVal2 = ref('')
    const topDefaultVal3 = ref('')
    const topRadioChange = (e,val,label) => {
      // console.log(e,label,val[label])
      if (topRadio(val[label]) == '1') {
        topDefaultVal1.value = val[label]; //存储初始数据
      } else {
        topDefaultVal2.value = val[label];
      }
      if (e.target.value == '2') { // 绝对值
        val[label] = topDefaultVal2.value.toString().split('%').shift();

      } else if (e.target.value == '3') { // 百分比
        if (topDefaultVal2.value.indexOf('%') != -1) {
          val[label] = topDefaultVal2.value;
        } else {
          val[label] = topDefaultVal2.value +'%';
        }

      } else {
        val[label] = topDefaultVal1.value

      }
    }
    const topRadio = (val) => {
      if (RegExp(/(top|middle|bottom)/).test(val)){
        return '1'
      }else if (RegExp(/(%)/).test(val)) {
        return '3'
      }else {
        return '2'
      }
    }
    // 判断边框
    const borderClick = (val, position) => {
      if (position == 'top') {
        val.borderTop=!val.borderTop
      } else if(position == 'bottom') {
        val.borderBottom=!val.borderBottom
      } else if (position == 'left') {
        val.borderLeft=!val.borderLeft
      } else if (position == 'right') {
        val.borderRight=!val.borderRight
      } 
    }
    // 选择背景类型
    const backgroundChange = (type) => {
      
    }
    const lableFilter = ((val) => {
      let arr = attrNameData.filter((item) =>{
          return val == item.key
        }
      )
      return arr[0] && arr[0].label || ''
    });
    const isObj = (object) => {// 判断是否是object
      return object && typeof (object) == 'object' && Object.prototype.toString.call(object).toLowerCase() == "[object object]";
    }
    return {
      icon_project_del,
      colorOrImage,
      showBgList,
      setBg,
      removeBgImg,
      activeKey,
      icon_bar_checked,
      icon_bar,
      icon_style_checked,
      icon_style,
      icon_title_checked,
      icon_title,
      icon_number_checked,
      icon_number,
      isLock,
      gradientColor,
      borderClick,
      icon_bg,
      icon_relevance,
      leftRadio,
      leftRadioChange,
      topRadio,
      topRadioChange,
      gridRadioChange,
      gridRadio,
      isObj,
      lableFilter,
      mode,
      state,
      borderTypeList,
      fontFamilyList,
      iconList,
      labelCol: { style: { width: '80px',textAlign: 'left', color:'#B2B2B2' } },
      // attrNameData,
    };
  },

};

</script>
<style scoped>
.icon_project_del {
  /* position: absolute;
  left:18%;
  top:50%;
  transform: translate(-18%, -50%); */
  cursor: pointer;
  margin-left:20px;
}
.flex-around {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 10px;
}
.attr-list {
  /* overflow: auto; */
  /* padding: 20px; */
  padding-top: 0;
  
}
.attr-list .ant-tabs {
  height: 100%;
  background: #12274b;
}
.params {
  /* height: 580px;
  overflow-y: auto; */
}
.radiusBox {
  width: 26px;
  height: 26px;
  background: #1D407D;
  opacity: 0.6;
}
.radiusTopLeftText {
  border-radius: 12px 0px 0px 0px;
}
.radiusTopRightText {
  border-radius: 0px 12px 0px 0px;
}
.radiusBottomLeftText {
  border-radius: 0px 0px 0px 12px;
}
.radiusBottomRightText {
  border-radius: 0px 0px 12px 0px;
}
.radiusLine {
  display: block;
  width: 20px;
  height: 6px;
  background: #001426;
  margin: 35px auto;
  border-radius: 2px;
}
.radiusText {
  width: 100%;
  text-align: center;
  display: block;
  color: #B2B2B2;
}
.border_box {
  padding: 10px;
  position: relative;
}
.border_box .frame {
    width: 54px;
    height: 54px;
    border: 1px solid #909399;
    text-align: center;
    line-height: 54px;
    font-size: 12px;
    color: #909399;
}
.border_box .top{
  top: 5px;
  left: 22px;
}
.border_box .bottom{
  left: 22px;
  bottom: 5px;
}
.border_box .left{
  transform: rotate(90deg);
  top: 34px;
  left: -5px;
}
.border_box .right{
  transform: rotate(90deg);
  top: 34px;
  left: 50px;
}
.border_box .active{
  background-color: #31d2fe;
}
.child_box {
  width: 30px;
  height: 10px;
  border: 1px solid #909399;
  position: absolute;
  cursor: pointer;
}
.line {
  display: block;
  width: 20px;
  height: 6px;
  background: #001426;
  margin: 13px auto;
  border-radius: 2px;
}
.iconImg {
  width: 16px;
}
/* /deep/.ant-tabs .ant-tabs-left-content { */
:deep(.ant-tabs .ant-tabs-left-content){
  padding-left:10px;
  border: none;
  background:#0f203d;
}
:deep(.ant-collapse-content > .ant-collapse-content-box) {
    padding: 5px;
}
:deep(.ant-tabs .ant-tabs-left-bar .ant-tabs-tab) {
  padding: 8px 12px;
  text-align: center;
}
</style>