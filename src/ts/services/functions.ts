export function strUcFirst(a: string): string {
  return (a + "").charAt(0).toUpperCase() + (a + "").substr(1);
}

export function toggleActive() {
  const navOptions = document.querySelector("#nav__options");
  const formSearch = document.querySelector("#formSearch");
  const classe: string = "actived";

  if (formSearch?.classList.contains(classe)) {
    setTimeout(() => {
      formSearch?.classList.remove(classe);
      navOptions?.classList.remove(classe);
    }, 50);
  } else {
    formSearch?.classList.add(classe);
    navOptions?.classList.add(classe);
  }
}
