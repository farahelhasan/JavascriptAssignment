export async function fetchData() {
  let dataFromApi = await fetch("https://randomuser.me/api/?results=30");
  let dataFromApiJsonFormat = await dataFromApi.json();
  const { results } = dataFromApiJsonFormat;
  //  console.log(results);
  return results;
}
