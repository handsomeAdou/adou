let app = getApp();


//内网穿透工具介绍:
// https://open-doc.dingtalk.com/microapp/debug/ucof2g
//替换成开发者后台设置的安全域名
let domain = "http://27m701270k.qicp.vip:46295";
let url = domain + '/login';

Page({
    data:{
        corpId: '',
        authCode:'',
        userId:'',
        userName:'',
        hideList: true,
    },
    loginSystem() {
        dd.showLoading();
        dd.getAuthCode({
            success:(res)=>{
                this.setData({
                    authCode:res.authCode
                })
                //dd.alert({content: "step1"});
                dd.httpRequest({
                    url: url,
                    method: 'POST',
                    data: {
                        authCode: res.authCode
                    },
                    dataType: 'json',
                    success: (res) => {
                        // dd.alert({content: "step2"});
                        console.log('success----',res)
                        let userId = res.data.result.userId;
                        let userName = res.data.result.userName;
                        this.setData({
                            userId:userId,
                            userName:userName,
                            hideList:false
                        })
                    },
                    fail: (res) => {
                        console.log("httpRequestFail---",res)
                       dd.alert({content: JSON.stringify(res)});
                    },
                    complete: (res) => {
                        dd.hideLoading();
                    }
                    
                });
            },
            fail: (err)=>{
                // dd.alert({content: "step3"});
                dd.alert({
                    content: JSON.stringify(err)
                })
            }
        })

    },
    onLoad(){
        console.log("监听事件")
        let _this = this;
        this.callback = this.callback.bind(this);
        //dd.offBluetoothAdapterStateChange(this.callback);
        //dd.offBluetoothDeviceFound(this.callback);
        //dd.offBLECharacteristicValueChange(this.callback);
        dd.offBLEConnectionStateChanged(this.callback);
        //dd.notifyBLECharacteristicValueChange(this.callback);

        //dd.onBluetoothAdapterStateChange(this.callback);
        //dd.onBluetoothDeviceFound(this.callback);
        //dd.onBLECharacteristicValueChange(this.callback);
        dd.onBLEConnectionStateChanged(this.callback);

        this.setData({
            corpId: app.globalData.corpId
        });
        
        
        //dd.alert({content: "step1"});
        
    },
    onUnload() {
      dd.offBluetoothAdapterStateChange(this.callback);
      dd.offBluetoothDeviceFound(this.callback);
      dd.offBLECharacteristicValueChange(this.callback);
      dd.offBLEConnectionStateChanged(this.callback);
    },
    callback(res) {
      console.log("搜索蓝牙设备返回值---"+JSON.stringify(res))
    },
    //获取蓝牙状态
    getBlueStatus(){
      dd.getBluetoothAdapterState({
        success: (res) => {
          console.log("蓝牙状态"+JSON.stringify(res))
        },
        fail:(res) => {
        },
        complete: (res)=>{
        }
      });
    },
    
    //打开蓝牙适配器
    openBluetoothAdapter(){
      dd.openBluetoothAdapter({
        success: (res) => {
          console.log("打开蓝牙适配器成功")
          console.log("domain")
          console.log(JSON.stringify(res))
        },
        fail:(res) => {
          console.log("打开蓝牙适配器失败")
        },
        complete: (res)=>{
          console.log("0--")
        }
      });
    },
    startBluetoothDevicesDiscovery(){
      //搜索蓝牙设备
      dd.startBluetoothDevicesDiscovery({
        services: [],
        success: (res) => {
          console.log("搜索蓝牙设备成功")
          console.log(JSON.stringify(res))
        },
        fail:(res) => {
          console.log("搜索蓝牙设备失败")
        },
        complete: (res)=>{
          console.log("1--")
        }
      });
    },
    //停止搜索
    stopBluetoothDevicesDiscovery(){
      dd.stopBluetoothDevicesDiscovery({
        success: (res) => {
          console.log("停止搜索"+JSON.stringify(res))
        },
        fail:(res) => {
        },
        complete: (res)=>{
        }
      });
    },
    //获取已搜索到的设备

    getBluetoothDevices(){
      dd.getBluetoothDevices({
        success: (res) => {
          console.log("获取已搜索到的设备.length"+res.devices.length)
          console.log(res.devices.length)
          console.log("获取已搜索到的设备"+JSON.stringify(res))
        },
        fail:(res) => {
          console.log("获取一搜索设备失败")
        },
        complete: (res)=>{
          console.log("2--")
          console.log(JSON.stringify(res))
        }
      });
    },
    //获取蓝牙设备所有 service（服务）
    getBLEDeviceServices(){
      dd.getBLEDeviceServices({
        //deviceId: "38:00:25:10:45:D1",
        //94:87:e0:c7:a6:46
        deviceId: "38:00:25:11:03:40",
        success: (res) => {
          console.log("获取蓝牙设备所有 service（服务）"+JSON.stringify(res))
        },
        fail:(res) => {
        },
        complete: (res)=>{
          console.log("蓝牙设备的service")
        }
      });
    },
    
    //获取已经连接到的蓝牙设备
    getConnectedBluetoothDevices(){
      dd.getConnectedBluetoothDevices({
        success: (res) => {
          console.log("获取已经连接到的蓝牙设备"+JSON.stringify(res.devices))
        },
        fail:(res) => {
          console.log("获取已连接蓝牙设备失败")
        },
        complete: (res)=>{
          console.log("3--")
        }
      });
    },
    //连接设备
    connectBLEDevice(){
      dd.connectBLEDevice({
        // 这里的 deviceId 需要在上面的 getBluetoothDevices 或 onBluetoothDeviceFound 接口中获取
        deviceId: "38:00:25:10:45:D1",
        //deviceId:"BC:75:74:B8:A7:48",
        //deviceId:"38:00:25:11:03:40",
        success: (res) => {
          console.log("连接设备成功"+JSON.stringify(res))
        },
        fail:(res) => {
        },
        complete: (res)=>{
        }
      });
    },
    //断开连接
    disconnectBLEDevice(){
      dd.disconnectBLEDevice({
        deviceId: "38:00:25:10:45:D1",
        success: (res) => {
          console.log(JSON.stringify(res))
        },
        fail:(res) => {
        },
        complete: (res)=>{
        }
      });
    },
    //停止搜索
    stopBluetoothDevicesDiscovery(){
      dd.stopBluetoothDevicesDiscovery({
        success: (res) => {
          console.log("停止搜索"+JSON.stringify(res))
        },
        fail:(res) => {
        },
        complete: (res)=>{
        }
      });
    },
    //写入数据
    writeBLECharacteristicValue(){
      dd.writeBLECharacteristicValue({
        deviceId: "38:00:25:10:45:D1",
        serviceId: serviceId,
        characteristicId: characteristicId,
        value: 'fffe',
        success: (res) => {
          console.log(JSON.stringify(res))
        },
        fail:(res) => {
        },
        complete: (res)=>{
        }
      });
      
    },
    //读蓝牙设备值中的数据
    readBLECharacteristicValue(){
      dd.readBLECharacteristicValue({
        deviceId: deviceId,
        serviceId: serviceId,
        characteristicId: characteristicId,
        success: (res) => {
          console.log(JSON.stringify(res))
        },
        fail:(res) => {
        },
        complete: (res)=>{
        }
      });
    },
    //关闭蓝牙适配器
    closeBluetoothAdapter(){
      dd.closeBluetoothAdapter({
        success: (res) => {
          console.log("关闭蓝牙成功"+JSON.stringify(res))
        },
        fail:(res) => {
        },
        complete: (res)=>{
        }
      });
    },
    //获取蓝牙设备所有 characteristic（特征值）
    getBLEDeviceCharacteristics(){
      dd.getBLEDeviceCharacteristics({
        deviceId: deviceId,
        serviceId: serviceId,
        success: (res) => {
          console.log(res)
        },
        fail:(res) => {
        },
        complete: (res)=>{
        }
      });
    }
      
    
})