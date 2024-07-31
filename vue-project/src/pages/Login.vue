<template>
    <div ref="loginPage" class="loginPage">
        <div  style="width:1000px; margin: auto;">
            <el-container class="h-100-v a-item" >
                <el-aside width="550px">
                    <div 
                    class="leftButtons"
                    style="margin-bottom: 60px;">
                        <el-button disabled 
                        icon = "Suitcase"
                        style="background-color: transparent;
                        border-radius: 20px;
                        color: white;">
                            工会 <el-icon class="el-icon--right"><ArrowRight/></el-icon>
                        </el-button>
                        
                        <el-button disabled 
                        icon = "house"
                        style="background-color: transparent;
                        border-radius: 20px;
                        color: white;">
                            财政支农 <el-icon class="el-icon--right"><ArrowRight/></el-icon>
                        </el-button>
                    </div>
                    <div class="branding">
                        <div class="logo">
                            <div 
                            style=
                            "margin-right: 80px;
                            margin-left: 80px;
                            display: flex;
                            padding: 10px; 
                            border: 0.8px solid white; 
                            border-radius: 18px;
                            align-items: center;
                            justify-content: center;
                            ">
                                <el-image 
                                :src = "'https://caichendaizhang.oss-cn-shenzhen.aliyuncs.com/loginPage/icon-1.png'"
                                style="width: 100px;
                                margin-right: 10px;"/>
                                <el-image :src = "'https://caichendaizhang.oss-cn-shenzhen.aliyuncs.com/loginPage/text-1.png'" style="width: 500px;" />
                            </div>
                        </div>
                        <div style="text-align: center; margin-top: 25px;">
                            <span style="color: white; font-size: 45px;">让财税服务更智能 · 更高效</span>
                        </div>
                        <div style="margin-top: 10px; margin-bottom: 70px; display: flex; align-items: center; justify-content: center;">
                            <span style="color: white; font-size: x-large;">帮助企业降低&nbsp</span>
                            <el-image :src = "'https://caichendaizhang.oss-cn-shenzhen.aliyuncs.com/loginPage/text-2.png'" style="width: 70px;"/>
                            <span style="color: white; font-size: x-large;">&nbsp运营成本</span>
                        </div>
                        
                    </div>
                </el-aside>
                <el-main class="loginWindow">
                    <div style="display: flex; align-items: center; justify-content: center;">
                        <el-image :src = "'https://caichendaizhang.oss-cn-shenzhen.aliyuncs.com/loginPage/icon-2.png'" style="width: 100px;"/>
                    </div>
                    <div style="text-align: center; font-size: x-large; margin-top: 20px; margin-bottom: 20px;">
                        <span>欢迎使用财臣快记软件</span>
                    </div>
                    
                    <el-form v-show="showLogin" ref="userForm" :model ="userForm" :rules="UserFormRules">
                        <el-form-item prop="username">
                            <el-input
                            v-model="userForm.username"
                            type="text"
                            prefix-icon = "Iphone"
                            placeholder="请输入手机号码"> 
                            </el-input>
                        </el-form-item>
                        
                        <el-form-item prop="password">
                            <el-input
                            v-model="userForm.password"
                            type="password"
                            placeholder = "请输入登录密码"
                            prefix-icon = "Lock"
                            show-password/>
                        </el-form-item>
    
                        <div style="text-align: right;">
                            <el-button color="red" size="small" @click="showLogin = !showLogin" link plain>忘记密码?</el-button><br>
                        </div>
                    
                        <el-button color="red" style="width: 330px; margin-top: 10px; margin-bottom: 20px;" @click="submitUserForm">登录</el-button>
                    </el-form>

                    <el-form :model="resetForm" ref="resetForm" :rules="resetFormRules" v-show="!showLogin">
                        <el-form-item prop="mobile">
                            <el-input v-model="resetForm.mobile" placeholder = "手机号码"/>
                        </el-form-item>

                        <el-form-item prop="code">
                            <el-input v-model="resetForm.code" placeholder = "验证码">
                                <template #append>
                                    <el-button size="default" @click="">获取验证码</el-button>
                                </template>
                            </el-input>
                        </el-form-item>

                        <el-form-item prop="newPassword">
                            <el-input placeholder = "请输入新密码" v-model="resetForm.newPassword" type="password" show-password/>
                        </el-form-item>

                        <el-form-item prop="passwordConfirm">
                            <el-input placeholder = "再次输入密码" v-model="resetForm.passwordConfirm" type="password" show-password/>
                        </el-form-item>

                        <div style="text-align: right;">
                            <el-button color="red" size="small" @click="showLogin = !showLogin" link plain>返回登录</el-button><br>
                        </div>

                        
                        <el-button color="red" style="width: 330px; margin-top: 10px; margin-bottom: 20px;" @click="submitResetForm">重置密码</el-button>
                        

                    </el-form>

                    <div style="text-align: center;">
                        <span style="font-size: small; color: gray;">广东财臣科技有限公司 荣誉出品</span>
                    </div>
                    
                </el-main>
            </el-container>
            
        </div>
    </div>
</template>

<script>
import JSEncrypt from 'jsencrypt';
import { req_login, req_pwdReset } from '@/request/login';



const encryption = function (pwd) {
    const encrypt = new JSEncrypt();
    encrypt.setPublicKey('MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAgBEOoiPWvS+iCJ7tLbq9d3/ssoB4K4PsfTqqjG22E+59CxvfETSoLOL8UERJPeCRLnM6kfAkmQi5/xqmAbqyMaAVoINRCAHEkGJxwA6rxXCmdgspfKIwHzWlmOj8BYH09uLtdbWS0CwZ1sFtoI+sHp200lvMyq+p6gjilh5/kbJa/YftXAyZAc4hIP0b+jIATYuB5Z1JNjCJMrSRYqnqZEMluTImi7+W+3bQNcex/agRkwqY44RXxiykJEpXFtgeteDGePr1GPi8KMQ9gzKzFj5lb0ih3A4LFgVoyHvDGaeeFoT82AXch/Mt081v9kD5Ce7JXedopYLOvZ2WK7kpiwIDAQAB');
    return encrypt.encrypt(pwd);
}


export default{
    data(){
        const checkNewPassword = (rules, value, callback) => {
            const regex = /^(?![a-zA-Z]+$)(?![a-zA-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z\W_]+$)(?![0-9\W_]+$)[a-zA-Z0-9\W_]{8,16}$/;
            if (regex.test(value)){
                callback();
            } else {
                callback(new Error("密码由8-16位数字、大写字母、小写字母、特殊字母三种及以上组合。"));
            }
        };

        const checkPasswordCondfirm = (rules, value, callback) => {
            if (value === this.resetForm.newPassword) {
                callback();
            } else {
                callback(new Error("新密码与确认密码不一致"));
            }
        };

        return {
            userForm: {
                username: '',
                password: '',
                type: 20
            },

            resetForm: {
                mobile: '',
                code: '',
                newPassword: '',
                passwordConfirm: '',
                userType: 20
            },

            UserFormRules: {
                username: [
                    {required: true, message: "此项为必填项", trigger: "blur"},
                    {min: 11, max: 11, message: "请输入正确手机号码", trigger: "blur"}
                ],
                password: [
                    {required: true, message: "此项为必填项", trigger: "blur"}
                ]
            },

            resetFormRules: {
                mobile: [
                    {required: true, message: "此项为必填项", trigger: "blur"},
                    {min: 11, max: 11, message: "请输入正确手机号码", trigger: "blur"}
                ],

                code: [
                    {required: true, message: "此项为必填项", trigger: "blur"},
                ],

                newPassword: [
                    {required: true, message: "此项为必填项", trigger: "blur"},
                    {validator: checkNewPassword, trigger: "blur"}
                ],
                
                passwordConfirm: [
                    {required: true, message: "此项为必填项", trigger: "blur"},
                    {validator: checkPasswordCondfirm, trigger: "blur"} 
                ]
            },

            showLogin: true,

        }
    },
    methods: {
        async submitUserForm() {
            const encrypt = encryption(this.userForm.password);
            const data = JSON.parse(JSON.stringify(this.userForm));
            data.password = encrypt;
            const userInfo = await req_login(data, () => {
                this.$message({
                    message: '登录错误',
                    type: 'error'
                });
            });
            localStorage.setItem("token",'5ERVUgIexOUx6' + userInfo.token);
            localStorage.setItem("jti", userInfo.claims.jti);
            this.$router.push('/keepAccounts');           
        },

        async submitResetForm() {
            const hash = encryption(this.resetForm.newPassword);
            const data = JSON.parse(JSON.stringify(this.resetForm));
            data.newPassword = hash;
            delete data.passwordConfirm;
            await req_pwdReset(data, () => {
                this.$message({
                    message: '重设失败',
                    type: 'error'
                })
            });
        }
    },  
}
</script>

<style>
    .loginWindow{
        background-color: white;
        border-radius: 20px;
        margin-left: 80px;
    }
    .loginPage{
        height: 100%;
        background-image: url("https://caichendaizhang.oss-cn-shenzhen.aliyuncs.com/loginPage/bg.jpg");
        background-size: 100% 100%;
    }
</style>