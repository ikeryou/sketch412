import { Func } from "../core/func";
import { MousePointer } from "../core/mousePointer";
import { MyDisplay } from "../core/myDisplay";
import { Tween } from "../core/tween";
import { Point } from "../libs/point";
import { Util } from "../libs/util";
import { Item } from "./item";

// -----------------------------------------
//
// -----------------------------------------
export class Contents extends MyDisplay {

  private _itemOut: Array<Item> = []
  private _itemIn: Array<Item> = []

  constructor(opt:any) {
    super(opt)

    const num = 10
    for(let i = 0; i < num; i++) {
      const el = document.createElement('div')
      el.classList.add('js-item')
      this.el.append(el)

      this._itemOut.push(new Item({
        el: el,
      }))
    }

    for(let i = 0; i < num * 1; i++) {
      const el = document.createElement('div')
      el.classList.add('js-item')
      this.el.append(el)

      this._itemIn.push(new Item({
        el: el,
      }))
    }

    this._resize()
  }

  protected _update(): void {
    super._update();

    const sw = Func.sw()
    const sh = Func.sh()

    this._setItems(Math.max(sw, sh) * 0.3, this._c, this._itemOut)
    this._setItems(Math.max(sw, sh) * 0.1, this._c * -1, this._itemIn)
  }

  private _setItems(radius: number, speed: number, items: Array<Item>): void {
    const sw = Func.sw()
    const sh = Func.sh()

    const center = new Point(sw * 0.5, sh * 0.5)

    const mx = MousePointer.instance.easeNormal.x
    // const my = MousePointer.instance.easeNormal.y
    // const mouseDist = Util.distance(mx, my, 0, 0)

    const radius2 = radius * Util.map(mx, 0.25, 1.5, -1, 1)

    const d = radius2 * 2 * Math.PI
    const it = d / items.length

    items.forEach((item, i) => {
      const rad = Util.radian((360 / items.length) * i + speed)
      const x = Math.cos(rad) * radius2
      const y = Math.sin(rad) * radius2
      const dx = 0 - x
      const dy = 0 - y
      const ang = Util.degree(Math.atan2(dy, dx)) + 90
      item.setEmojiSize(it * 1)
      Tween.set(item.el, {
        x: center.x + x - item.size.width * 0.5,
        y: center.y + y - item.size.height * 0.5,
        rotationZ: ang,
        width: item.size.width,
        height: item.size.height,
      })
    })
  }
}