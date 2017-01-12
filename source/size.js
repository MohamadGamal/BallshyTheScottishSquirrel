var Size = function (width, height)
{
	this.width = width
	this.height = height
	this.isequal=function(sizecmp){


if(sizecmp===null)
			return false
		if(this.width==sizecmp.width &&this.height==sizecmp.height )
			return true;
		return false;

	}

}