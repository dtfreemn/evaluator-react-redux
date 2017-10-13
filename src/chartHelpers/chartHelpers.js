export function makeArrayOfColors() {
    const colors = []
    while (colors.length < 100) {
      colors.push(`rgba(${randomNum(0,255)}, ${randomNum(0,255)}, ${randomNum(0,255)}, 0.5)`)
    }
    function randomNum(frm, to) {
      return (Math.floor(Math.random() * (to - frm)) + frm)
    }
    return colors
  }