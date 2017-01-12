var Rect = function(x, y, width, height)
{	
	this.origin = new Point (x, y)
	this.size = new Size (width, height)
	this.includes = function (point)
	{
		var x = this.origin.x
		var y = this.origin.y
		var width = this.size.width
		var height = this.size.height 
		return (x <= point.x && point.x <= x+width) && (y <= point.y && point.y <= y+height)

	}
	this.isequal=function(rectcmp){



		if(rectcmp===null)
			return false
	if(this.origin.isequal(rectcmp.origin) &&this.size.isequal(rectcmp.size) )
			return true;
			
			return false;





	}
}
