<template>
  <div class="uw">
    <button v-on:click="open" id="upload_widget" class="cloudinary-button">
      Upload files
    </button>
  </div>
</template>

<script>
import { ref } from 'vue';

const cloudName = "clegowi";
const uploadPreset = "xljzzzla";

export default {
  name: "UploadWidget",
  props: {
    updateImgURL: Function,
  },
  setup(props) {
    const updateImgURLRef = ref(props.updateImgURL);

    const open = (e) => {
      const myWidget = cloudinary.createUploadWidget(
        {
          cloudName: cloudName,
          uploadPreset: uploadPreset,
        },
        (error, result) => {
          if (!error && result && result.event === "success") {
            console.log("Done! Here is the image info: ", result.info);
            updateImgURLRef.value(result.info.secure_url);
          }
        }
      );

      myWidget.open();
      e.preventDefault();
    };

    return {
      open,
    };
  },
};
</script>
