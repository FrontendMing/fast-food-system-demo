<template>
  <div class="pos">
    <el-row>
      <!-- 左栏 -->
      <el-col :span="7" class="pos-order">
        <el-tabs>
          <el-tab-pane label="点餐">
            <el-table :data="tableData" border width="100%">
              <el-table-column prop="goodsName" label="商品名称"></el-table-column>
              <el-table-column prop="count" label="数量" width="50"></el-table-column>
              <el-table-column prop="price" label="金额" width="70"></el-table-column>
              <el-table-column label="操作" width="100" fixed="right">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="delSingleGoods(scope.row)">删除</el-button>
                  <el-button type="text" size="small" @click="addOrderList(scope.row)">增加</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="挂单">
            挂单
          </el-tab-pane>
          <el-tab-pane label="外卖">
            外卖
          </el-tab-pane>
        </el-tabs>

        <div class="calcDiv">
          <span>
            <small>数量</small>：{{totalCount}}</span>
          <span>
            <small>金额</small>：{{totalMoney}}</span>
        </div>
        <div class="btn-area">
          <el-button type="warning">挂单</el-button>
          <el-button type="danger" @click="delAllGoods()">删除</el-button>
          <el-button type="success" @click="checkout()">结账</el-button>
        </div>
      </el-col>
      <!-- 右栏 -->
      <el-col :span="17" class="pos-goods">
        <div class="title">常用商品</div>
        <ul class="goods-list">
          <li v-for="goods in offenGoods" @click="addOrderList(goods)">
            <span>{{goods.goodsName}}</span>
            <span class="goods-price">￥{{goods.price}}元</span>
          </li>
        </ul>

        <div class="goods-type">
          <el-tabs>
            <el-tab-pane label="汉堡">
              <ul class='cookList'>
                <li v-for="goods in typeGoods0" @click="addOrderList(goods)">
                  <img :src="goods.goodsImg" class="foodImg">
                  <div>
                    <span class="foodName">{{goods.goodsName}}</span>
                    <span class="foodPrice">￥{{goods.price}}元</span>
                  </div>
                </li>
              </ul>
            </el-tab-pane>
            <el-tab-pane label="小食">
              <ul class='cookList'>
                <li v-for="goods in typeGoods1" @click="addOrderList(goods)">
                  <img :src="goods.goodsImg" class="foodImg">
                  <div>
                    <span class="foodName">{{goods.goodsName}}</span>
                    <span class="foodPrice">￥{{goods.price}}元</span>
                  </div>
                </li>
              </ul>
            </el-tab-pane>
            <el-tab-pane label="饮料">
              <ul class='cookList'>
                <li v-for="goods in typeGoods2" @click="addOrderList(goods)">
                  <img :src="goods.goodsImg" class="foodImg">
                  <div>
                    <span class="foodName">{{goods.goodsName}}</span>
                    <span class="foodPrice">￥{{goods.price}}元</span>
                  </div>
                </li>
              </ul>
            </el-tab-pane>
            <el-tab-pane label="套餐">
              <ul class='cookList'>
                <li v-for="goods in typeGoods3" @click="addOrderList(goods)">
                  <img :src="goods.goodsImg" class="foodImg">
                  <div>
                    <span class="foodName">{{goods.goodsName}}</span>
                    <span class="foodPrice">￥{{goods.price}}元</span>
                  </div>
                </li>
              </ul>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'pos',
  data() {
    return {
      tableData: [],
      offenGoods: [],
      typeGoods0: [],
      typeGoods1: [],
      typeGoods2: [],
      typeGoods3: [],
      totalCount: 0,
      totalMoney: 0
    }
  },
  created() {
    this.$api.get('http://jspang.com/DemoApi/oftenGoods.php', {}, res => {
      if (res.status >= 200 && res.status < 300) {
        this.offenGoods = res.data
      } else {
        console.log(res.message)
      }
    })
    this.$api.get('http://jspang.com/DemoApi/typeGoods.php', {}, res => {
      if (res.status >= 200 && res.status < 300) {
        this.typeGoods0 = res.data[0]
        this.typeGoods1 = res.data[1]
        this.typeGoods2 = res.data[2]
        this.typeGoods3 = res.data[3]
      } else {
        console.log(res.message)
      }
    })
  },
  mounted() {
    let orderHeight = document.body.clientHeight
    document.querySelector('.pos-order').style.height = orderHeight + 'px'
  },
  methods: {
    // 添加商品
    addOrderList(goods) {
      // 商品是否已经存在于订单列表中
      let isHave = false
      for (let i = 0, len = this.tableData.length; i < len; i++) {
        if (this.tableData[i].goodsId == goods.goodsId) {
          isHave = true
        }
      }
      // 根据判断的值编写业务逻辑
      if (isHave) {
        // 改变列表中商品的数量
        let arr = this.tableData.filter(a => a.goodsId == goods.goodsId)
        arr[0].count++
      } else {
        let newGoods = {
          goodsId: goods.goodsId,
          goodsName: goods.goodsName,
          price: goods.price,
          count: 1
        }
        this.tableData.push(newGoods)
      }
      this.getAllMoney()
    },
    // 删除单个商品
    delSingleGoods(goods) {
      this.tableData = this.tableData.filter(a => a.goodsId != goods.goodsId)
      this.getAllMoney()
    },
    // 删除所有商品
    delAllGoods(){
      this.tableData = []
      this.totalCount = 0
      this.totalMoney = 0
    },
    // 计算总数和金额
    getAllMoney() {
      this.totalCount = 0
      this.totalMoney = 0
      if (this.tableData) {
        this.tableData.forEach(element => {
          this.totalCount += element.count
          this.totalMoney += element.count * element.price
        })
      }
    },
    // 模拟结账
    checkout(){
      if(this.totalCount){
        this.delAllGoods()
        this.$message({type: 'success',message: '结账成功'})
      }else{
        this.$message.error('商品为空')
      }
    }
  }
}
</script>

<style scoped>
.pos-order {
  height: 100%;
  background-color: #f9fafc;
  border-right: 1px solid #c0ccda;
}
.calcDiv {
  padding: 10px;
  background-color: #fff;
  border-bottom: 1px solid #c0ccda;
}
.calcDiv span {
  margin: 20px;
}
.btn-area {
  margin-top: 20px;
}
.title {
  height: 18px;
  border-bottom: 2px solid #e2ecf7;
  background-color: #f9fafc;
  padding: 10px;
  text-align: left;
  line-height: 1.2;
}
.goods-list {
  display: flex;
  flex-wrap: wrap;
}
.goods-list li {
  list-style: none;
  border: 1px solid #adc5f5;
  padding: 10px;
  margin: 10px;
  background-color: #fff;
  cursor: pointer;
}
.goods-price {
  color: #adc5f5;
}
.goods-type {
  margin-top: 20px;
}
.cookList {
  display: flex;
  flex-wrap: wrap;
}
.cookList li {
  display: flex;
  list-style: none;
  width: 20%;
  border: 1px solid #e5e9f2;
  overflow: hidden;
  background-color: #fff;
  padding: 2px;
  margin: 10px;
  cursor: pointer;
}
.cookList li .foodImg {
  width: 80px;
  height: 80px;
  object-fit: cover;
}
.foodName {
  font-size: 18px;
  padding-left: 10px;
  color: brown;
}
.foodPrice {
  font-size: 16px;
  padding-left: 10px;
  padding-top: 10px;
}
</style>