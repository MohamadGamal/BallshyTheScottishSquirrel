var Point = function (x, y)
{
	this.x = x
	this.y = y
	this.isequal=function(pointcmp){

if(pointcmp===null)
			return false

		if(this.x==pointcmp.x &&this.y==pointcmp.y )
			return true;
		return false;

	}

}