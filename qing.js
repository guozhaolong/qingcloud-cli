#!/usr/bin/env node

'use strict';

const program = require('commander');
const request = require('request');
const crypto = require('crypto');
const queryString = require('query-string');

let key = "xer6Ka5Sxk1F5sL61Freu0VU3HuIl6B0cqXrPLiF";
let params = {
    "access_key_id":"XGQHDMIWWTMUWFZDUIDQ",
    "signature_method":"HmacSHA256",
    "signature_version":1,
    "time_stamp":"2016-07-27T22:58:35Z",
    "version":1,
    "zone":"gd1"
}

function req_api(p){
    let unsign_str = "GET\n/iaas/\n"+queryString.stringify(p);
    let signature = encodeURIComponent(crypto.createHmac('SHA256', key).update(unsign_str).digest('base64'));
    var options = {
        url: 'https://api.qingcloud.com/iaas/?'+queryString.stringify(p)+"&signature="+signature,
        method: 'GET',
        json: true
    };
    request(options, function(err, res, body) {
        if(res.statusCode == 200 && body.ret_code == 0){
            if(p.action == 'DescribeInstances')
                for(var ins of body.instance_set){
                    console.log("虚拟机"+ins.instance_id+ "("+ins.instance_name+")\n");
                    console.log("创建时间 "+ins.create_time+"\n");
                    console.log("类型 "+ins.instance_type+"\n");
                    console.log("平台 "+ins.image.platform+"\n");
                    console.log("状态 "+ins.status+"\n");
                    console.log("--------------------\n");
                }

            else if(p.action == 'RunInstances')
                console.log("虚拟机 "+body.instances+" 创建成功!");
            else if(p.action == 'TerminateInstances')
                console.log("虚拟机 "+p["instances.1"]+" 销毁成功!");
        }else{
            console.log(body.message);
        }
    });
}

function validate(p,name){
    if(!p){
        console.error();
        console.error("  error: missing option "+name);
        console.error();
        process.exit(1);
    }
}

program.version('0.0.1');
program.usage('[command] [options]');

program.command('run-ins')
    .description('创建虚拟机')
    .option('-i, --image_id <id>', '指定操作系统[centos66x64a,debian8x64b],默认为centos66x64a')
    .option('-n, --instance_name <name>','指定主机名称')
    .option('-p, --login_passwd <passwd>','指定管理员账号密码')
    .option('-t, --instance_type <type>', '指定CPU和内存类型[c1m1|c2m8|c4m16],默认为c1m1; 注: c表示CPU核数,m表示内存,单位GB')
    .action(function(options) {
        validate(options.instance_name,'instance_name');
        validate(options.login_passwd,'login_passwd');
        params.action = "RunInstances";
        params.instance_name = options.instance_name;
        params.instance_type = options.instance_type||"c1m1";
        params.image_id = options.image_id||"centos66x64a";
        params.login_mode = "passwd";
        params.login_passwd = options.login_passwd;
        req_api(params);
    });

program.command('get-ins')
    .description('查询虚拟机')
    .option('-i, --instances <vmID>', '指定虚拟机ID,否则返回所有虚拟机数据')
    .action(function(options) {
        params.action = "DescribeInstances";
        params["instances.1"] = options.instances;
        req_api(params);
    });


program.command('drop-ins')
    .description('销毁虚拟机')
    .option('-i, --instances <value>', '指定虚拟机ID')
    .action(function(options) {
        validate(options.instances,'instances');
        params.action = "TerminateInstances";
        params["instances.1"] = options.instances;
        req_api(params);
    });


program.parse(process.argv);

if(process.argv.length <= 2){
    program.outputHelp();
}
