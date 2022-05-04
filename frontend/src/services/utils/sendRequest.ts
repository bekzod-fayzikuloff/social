const sendData = async (resourceUrl: string, data: object) => {
  return await fetch(resourceUrl, {
    method: "POST",
    mode: 'cors',
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(
      data
    )
  });
}

export { sendData };