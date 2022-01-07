export default abstract class View {
  private template: string
  private renderTemplate: string
  private container: HTMLElement
  private htmlList: string[]

  constructor(containerId: string, template: string) {
    const conainerElement = document.getElementById(containerId)

    if (!conainerElement) {
      throw '최상위 컨테이너가 없어 UI를 진행하지 못합니다.'
    }
    this.container = conainerElement
    this.template = template
    this.renderTemplate = template
    this.htmlList = []
  }

  protected updateView(): void {
    this.container.innerHTML = this.renderTemplate
    this.renderTemplate = this.template
  }

  // 데이터를 배열에 담는 메서드
  protected addHtml(htmlString: string): void {
    this.htmlList.push(htmlString)
  }

  protected getHtml(): string {
    const snapshot = this.htmlList.join('')
    this.clearHtmlList()
    return snapshot
  }

  // replace하는 부분을 메서드로 만들어 깔끔하게 사용
  protected setTemplateData(key: string, value: string): void {
    this.renderTemplate = this.renderTemplate.replace(`{{__${key}__}}`, value) // !! 여기에 key값 넣는거 멋있네요
  }

  private clearHtmlList(): void {
    this.htmlList = []
  }
  abstract render(): void
}
