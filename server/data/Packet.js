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

function ReqPacket(reqParams) {
	this.version = '';
	this.params = reqParams;
}


exports.ResPacket = ResPacket;
exports.ReqPacket = ReqPacket;