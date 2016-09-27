function ResPacket(result) {
	this.status = result.status;
	this.version = gConfig.server_version;
	this.message = result.msg ? result.msg : "";
	this.data = result.data ? result.data : {};
}

ResPacket.prototype.toJsonString = function() {
	var jsonObject = {};
	jsonObject['status'] = this.status;
	jsonObject['version'] = this.version;
	jsonObject['message'] = this.message;
	jsonObject['data'] = this.data;

	return JSON.stringify(jsonObject);
}

function ReqPacket(req, isGet) {
	this.req = req;
	this.version = req.param('version');
    this.isGet = isGet;
}

ReqPacket.prototype.getValue = function (key) {
    return this.req.param(key);
}

ReqPacket.prototype.getWhereCondition = function(datas) {
	var ret = '1=1';
	for(var pro in datas)
	{
		if (gDB.checkVaildField(pro))
		{
			ret += " and " + pro + "=" + gDB.escape(datas[pro]);
		}
	}

	return ret;
}

exports.ResPacket = ResPacket;
exports.ReqPacket = ReqPacket;