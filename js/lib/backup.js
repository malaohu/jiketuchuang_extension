define(['jquery'], function ($) {
  return {
    ipfs: function (file) {
      var formData = new FormData()
      formData.append("file", file)
      //{"Name":"11111.png","Hash":"QmNx17xxzrzSvS1DXNYsUnUrXBUohoHNG6L3uhFFsYFRNe","Size":"33950"}
      // $.ajax({
      //   url: 'https://ipfsapi.glitch.me//api/v0/add?pin=true',
      //   type: 'post',
      //   data: formData,
      //   contentType: false,
      //   processData: false,
      //   mimeType: 'multipart/form-data',
      //   success: function (res) {
      //     console.log(res.data);
      //   }
      //})
    }
  }
});