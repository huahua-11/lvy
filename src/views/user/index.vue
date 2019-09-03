<template>
  <div class="wel">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框 -->
    <div style="margin: 15px;">
      <el-input
        placeholder="请输入搜索内容"
        v-model="query"
        class="input-with-select"
        style="width:300px;margin-right:15px"
        @keyup.enter.native="seach"
      >
        <el-button slot="append" icon="el-icon-search" @click="seach"></el-button>
      </el-input>
      <el-button type="warning" round @click="addDialogFormVisible=true">添加用户</el-button>
    </div>
    <!-- 表格数据 -->
    <el-table :data="userList" border style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column property="username" label="姓名" width="120"></el-table-column>
      <el-table-column property="email" label="邮箱" width="120"></el-table-column>
      <el-table-column property="mobile" label="电话" width="250"></el-table-column>
      <el-table-column label="状态" width="120">
        <template slot-scope="scope">
          <el-switch
          v-model="scope.row.mg_state"
          @change="changeUserState(scope.row.id,scope.row.mg_state)"
          active-color="#13ce66"
          inactive-color="#ff4949"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="500">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <el-button size="mini" type="primary" @click="handleEdit(scope.row)" class="el-icon-edit"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="分享" placement="top">
            <el-button size="mini" type="warning" @click="handlefx(scope.$index, scope.row)" class="el-icon-share"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)" class="el-icon-delete"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <!--
      handleSizeChange :切换每页选择的数量
      handleCurrentChange：切换当前是第几页
      :current-page：当前页码
      :page-size：默认每页所展示的记录数
      :total：总记录数
    -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[1, 3, 5, 7]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <!-- 添加用户对话框 -->
    <el-dialog title="添加用户" :visible.sync="addDialogFormVisible">
      <el-form :model="addForm"  :label-width="'80px'" :rules='rules' ref='addForm'>
        <el-form-item label="用户名" prop='username'>
          <el-input v-model="addForm.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop='password'>
          <el-input v-model="addForm.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop='email'>
          <el-input v-model="addForm.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop='mobile'>
          <el-input v-model="addForm.mobile" auto-complete="off"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click='addUser'>确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getUserList, addUser, upUserState, delUser } from '@/api/user.js'
export default {
  data () {
    return {
      query: '',
      userList: [],
      pagenum: 1,
      pagesize: 5,
      total: 0,
      // 添加用户对话框显示和隐藏
      addDialogFormVisible: false,
      // 添加用户数据对象
      addForm: {
        username: '',
        password: '',
        email: 'eee@123.com',
        mobile: '13456789098'
      },
      rules: {
        username: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        password: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        email: [
          // wuhu0723@126.com
        //   学习正则就是学习它的元字符
        // 1.占位符，说明这个位置需要填入满足要求的字符
        // \w:合法字符： 0-9 a-z A-Z _   \W：非法字符
        // \d:数字：0-9   \D:非数字
        // 2.修饰符：修饰前面的字符所出现的次数，前面的字符默认是指前面的一个字符，除非你使用()包含
        // +：修饰前面的字符出现1次或多次
        // ？：修饰前面的字符出现0次或1次
        // {n,m}:修饰前面的字符最少出现n次，最多出现m次
        // {n}:修饰前面的字符出现n次
        // {n,}修饰前面的字符最少出现n次，最多没有限制
          { required: true, message: '请填写email', trigger: 'blur', pattern: /\w+[@]\w+[.]\w{2,3}/ }
        ],
        mobile: [
          { required: true, message: '请填写手机号', trigger: 'blur' },
          { pattern: /^1[345678]\d{9}$/, message: '请填写正确的手机号(11位数字)', trigger: 'blur' }
        ]
      }

    }
  },
  mounted () {
    this.into()
  },
  methods: {
    // 删除用户单个id
    handleDelete (id) {
      // 1.是否确定删除
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 单机确定按钮，执行下一步.then实现删除
        delUser(id).then(res => {
          // console.log(res)
          if (res.data.meta.status === 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          }
          // 判断本次删除之后，当前页还有没有数据，如果有数据，就保持页码为当前页，否则就到上一页
          // ceil(x) 函数返回一个大于或等于 x 的的最小整数。
          this.pagenum = Math.ceil(this.total - 1 / this.pagesize) < this.pagenum ? --this.pagenum : this.pagenum
          this.into()
        }).catch(err1 => {
          this.$message.error('删除失败')
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 修改用户的状态
    changeUserState (id, type) {
      upUserState(id, type).then(res => {
        // console.log(res)
        if (res.data.meta.status === 200) {
          this.$message.success(res.data.meta.msg)
        }
      })
    },
    // 添加用户数据
    addUser () {
      // 再次实现用户验证
      this.$refs.addForm.validate(valid => {
        if (valid) {
          addUser(this.addForm).then(res => {
            // console.log(res)
            if (res.data.meta.status === 201) {
              // 让对话框隐藏
              this.addDialogFormVisible = false
              // 重置表单元素的数据
              this.$refs.addForm.resetFields()
              // 实现数据的刷新
              this.into()
            } else {
              this.$message.error(res.data.meta.msg)
            }
          }).catch(err => {
            console.log(err)
          })
        } else {
          return false
        }
      })
    },
    // 点击搜索关键字
    seach (value) {
      this.pagenum = 1
      // 刷新数据
      this.into()
    },
    // 初始化数据
    into () {
      // 获取所有用户数据
      getUserList({
        query: this.query,
        pagenum: this.pagenum,
        pagesize: this.pagesize
      })
        .then(res => {
        // console.log(res)
          this.userList = res.data.data.users
          this.total = res.data.data.total
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 切换每页的选择数量
    handleSizeChange (val) {
      // 将pagesize重置，再次发起数据请求
      this.pagesize = val
      // 刷新数据
      this.into()
      // console.log(`每页 ${val} 条`)
    },
    // 切换当前是第几页
    handleCurrentChange (val) {
      // 将pagenum重置，再次发起数据请求
      this.pagenum = val
      this.into()
      // console.log(`当前页: ${val}`)
    }
  }
}
</script>

<style lang="less">
</style>
