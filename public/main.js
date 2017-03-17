var del = document.getElementsByClassName('quote')
$(del).click(function(event) {
  fetch('quotes', {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      '_id': this.id
    })
  })
  .then(res => {
    if (res.ok) window.location.reload()
  })
});
