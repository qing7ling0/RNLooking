function ResPacket(err, result) {
	this.status = err ? 1 : 0;
	this.version = '1';
	this.message = err ? err : '';
	this.data = result;
}

ResPacket.prototype.toJsonString = function() {
	var jsonObject = {};
	jsonObject['status'] = this.status;
	jsonObject['version'] = this.version;
	jsonObject['message'] = this.message;
	jsonObject['data'] = this.data;

	return JSON.stringify(jsonObject);
}

function ReqPacket(req) {
	this.req = req;
	this.reqData = req.body.reqData;
	this.version = req.body.version;
	var params = req.params;
	gLog.debug('ReqPacket create ver=' + this.version + '; reqData=' +  req.params);
}

ReqPacket.prototype.getQueryCondition = function() {
	var ret = '1=1';
	for(var pro in this.reqBody)
	{
		if (gDB.checkVaildField(pro))
		{
			ret += " and " + pro + "=" + gDB.escape(params[pro]);
		}
	}

	return ret;
}



exports.ResPacket = ResPacket;
exports.ReqPacket = ReqPacket;