import { MyDisplay } from "../core/myDisplay";
import { Tween } from "../core/tween";
import { Rect } from "../libs/rect";
import { Util } from "../libs/util";

// -----------------------------------------
//
// -----------------------------------------
export class Item extends MyDisplay {

  private _emoji: HTMLElement
  private _mekakushi: HTMLElement

  private _size: Rect = new Rect(0, 0, 0, 0)
  public get size(): Rect { return this._size }

  constructor(opt:any) {
    super(opt)

    this._emoji = document.createElement('div')
    this._emoji.classList.add('js-emoji')
    this.el.append(this._emoji)
    this._emoji.innerHTML = Util.randomArr(['😀', '😄', '😁', '😆', '🙂', '😊'])
    // this._emoji.innerHTML = '😀'

    this._mekakushi = document.createElement('div')
    this._mekakushi.classList.add('js-mekakushi')
    this.el.append(this._mekakushi)

    this.useGPU(this._emoji)
    this.useGPU(this.el)
  }

  public setEmojiSize(size: number):void {
    this._emoji.style.fontSize = `${size}px`
  }


  protected _update():void {
    super._update();

    if(this._c % 1 == 0) {
      const emojiSize = new Rect(0, 0, this.getWidth(this._emoji), this.getHeight(this._emoji))
      this._size.copy(emojiSize)

      const meWidth = emojiSize.width * 0.9
      const meHeight = emojiSize.height * 0.25
      Tween.set(this._mekakushi, {
        width: meWidth,
        height: meHeight,
        x: emojiSize.width * 0.5 - meWidth * 0.5,
        y: emojiSize.height * 0.25,
        // scaleY: Util.map(Math.sin(rad), 0, 1, -1, 1)
      })
    }
  }
}