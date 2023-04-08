export const uploadImage = async (uploadUrl, image) => {
  const res = await fetch(image).catch(e => console.log(e));
  const blob = await res.blob();

  await fetch(uploadUrl, {
    method: "PUT",
    body: blob,
  }).catch(e => console.log(e));
  
  const url = uploadUrl.split('?')[0]
  return url.split('.com/')[1]
}