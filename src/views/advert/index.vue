<template>
  <div class="space-list">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button
          size="small"
          @click="$router.push({ name: 'addOrEditAdvert' })"
          >添加广告</el-button
        >
      </div>
      <el-table :data="adList" stripe style="width: 100%">
        <el-table-column
          prop="id"
          label="id"
          width="60"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="广告名称"
          width="200"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="advertPosition"
          label="广告位置"
          width="200"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="img" label="广告图片" width="120" align="center">
          <template slot-scope="scope">
            <img style="height: 80px" :src="scope.row.img" />
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="时间"
          width="300"
          align="center"
        >
          <template slot-scope="scope">
            <p>开始时间：{{ scope.row.startTime | getDate }}</p>
            <p>结束时间：{{ scope.row.updateTime | getDate }}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="上线/下线"
          min-width="100"
          align="center"
        >
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              active-color="#40586f"
              inactive-color="#dcdfe6"
              :active-value="1"
              :inactive-value="0"
              @change="handleChangeState(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="
                $router.push({
                  name: 'addOrEditAdvert',
                  params: {
                    id: scope.row.id,
                  },
                })
              "
              >编辑</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <div class="space-pagination">
      <el-pagination
        v-if="allAdList.length > 100"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="allAdList.length"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import moment from "moment";
import { getAdList, getAllSpaces, updateStatus } from "@/services/advert";
import store from "@/store";

export default Vue.extend({
  data() {
    return {
      allSpacesList: [],
      allAdList: [],
      adList: [],
      currentPage: 1,
      pageSize: 100,
      isLoading: false,
    };
  },
  filters: {
    getDate: function (day: string) {
      return moment(day).format("YYYY-MM-DD HH:mm:ss");
    },
  },
  created() {
    this.querySpaces();
    // this.queryAdList();
  },
  methods: {
    async querySpaces() {
      this.isLoading = true;
      const { data } = await getAllSpaces();
      if (data.success) {
        this.allSpacesList = data.content;
        store.dispatch("setSpacesList", data.content);
        this.queryAdList();
      }
    },
    async queryAdList() {
      const { data } = await getAdList();
      if (data.success) {
        this.getAdList(data.content);
      }
    },
    // 处理广告列表数据
    getAdList(lists: any) {
      this.allAdList = lists.map((adInfo: any) => {
        const spaceInfo: any = this.allSpacesList.find(
          (space: any) => space.id === adInfo.spaceId
        );
        adInfo.advertPosition = (spaceInfo && spaceInfo.name) || "";
        return adInfo;
      });
      this.adList = this.allAdList.slice(0, this.pageSize);

      this.isLoading = false;
      console.log(this.allAdList);
    },
    async handleChangeState(advertInfo: any) {
      this.isLoading = true;
      const { data } = await updateStatus({
        id: advertInfo.id,
        status: advertInfo.status,
      });
      this.isLoading = false;
      if (data.success) {
        this.$message.success(
          `${advertInfo.status === 1 ? "上线" : "下线"}成功`
        );
      } else {
        this.$message.success(
          `${advertInfo.status === 1 ? "上线" : "下线"}失败`
        );
        this.queryAdList();
      }
    },
    handleSizeChange(val: number) {
      this.currentPage = 1;
      this.pageSize = val;
      this.adList = this.allAdList.slice(0, this.pageSize);
    },
    handleCurrentChange(val: number) {
      console.log(`当前页: ${val}`);
      this.adList = this.allAdList.slice(
        (val - 1) * this.pageSize,
        val * this.pageSize
      );
    },
  },
});
</script>

<style lang="scss" scoped>
.space-pagination {
  margin-top: 20px;
}
</style>
