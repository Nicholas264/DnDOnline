function hslToRgb(h, s, l){
	if (h > 1) h /= 360;
	if (s > 1) s /= 100;
	if (l > 1) l /= 100;
	var r, g, b;
	if(s == 0){
		r = g = b = l;
	}else{
		var hue2rgb = function hue2rgb(p, q, t){
			if(t < 0) t += 1;
			if(t > 1) t -= 1;
			if(t < 1/6) return p + (q - p) * 6 * t;
			if(t < 1/2) return q;
			if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
			return p;
		}
		var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
		var p = 2 * l - q;
		r = hue2rgb(p, q, h + 1/3);
		g = hue2rgb(p, q, h);
		b = hue2rgb(p, q, h - 1/3);
	}
	let strs = [Math.round(r * 255).toString(16), Math.round(g * 255).toString(16), Math.round(b * 255).toString(16)];
	return "#" + "0".repeat(2-strs[0].length) + strs[0] + "0".repeat(2-strs[1].length) + strs[1] + "0".repeat(2-strs[2].length) + strs[2];
}
function rgbToHsl(rgb){
	if (rgb.includes("#") && typeof rgb === "string") {
		rgb = rgb.replace("#", "");
		rgb = rgb.match(/.{2}/g).map(x=>parseInt(x,16));
	}
	let r = rgb[0] / 255;
	let g = rgb[1] / 255;
	let b = rgb[2] / 255;
	var max = Math.max(r, g, b), min = Math.min(r, g, b);
	var h, s, l = (max + min) / 2;
	if(max == min){
		h = s = 0; 
	}else{
		var d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
		switch(max){
			case r: h = (g - b) / d + (g < b ? 6 : 0); break;
			case g: h = (b - r) / d + 2; break;
			case b: h = (r - g) / d + 4; break;
		}
		h /= 6;
	}
	return [h * 360, s * 100, l * 100].map(x=>Math.round(x));
}