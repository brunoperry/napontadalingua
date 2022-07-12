window.onload = async () => {
  const uiData = await fetch("ui");
  const res = await uiData.json();

  console.log(res);
};
