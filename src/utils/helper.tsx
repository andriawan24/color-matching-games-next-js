export function hsl2Rgb(h: number, s: number, l: number){
  s = s/100;
  l = l/100;
  var c, x, m: number, rgb: number[] = [];

  c = (1-Math.abs(2*l-1))*s;
  x = c*(1-Math.abs(((h/60)%2)-1));
  m = l-c/2;
  if (h>=0&&h<60) rgb=[c,x,0];
  if (h>=60&&h<120) rgb=[x,c,0];
  if (h>=120&&h<180) rgb=[0,c,x];
  if (h>=180&&h<240) rgb=[0,x,c];
  if (h>=240&&h<300) rgb=[x,0,c];
  if (h>=300&&h<=360) rgb=[c,0,x];

  return rgb.map(function(v){
    return 255*(v+m)|0;
  });
}

export function rgb2Hex(r: number, g: number, b: number) {
  var rgb = b | (g << 8) | (r << 16);
  return '#' + (0x1000000 + rgb).toString(16).slice(1)
}

export function hsl2Hex(h: number, s: number, l: number) {
  var rgb = hsl2Rgb(h, s, l)
  return rgb2Hex( rgb[0], rgb[1], rgb[2] )
}