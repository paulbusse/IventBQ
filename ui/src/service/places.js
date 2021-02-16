function getAllPlaces() {
  this.axios.get('/places')
    .then((res) => {
      this.places = res.data;
    })
    .catch(() => {
      this.$toast.add({
        severity: 'error',
        summary: 'Server fout',
        details: 'Het ophalen van de plaatsen is mislukt!',
      });
    });
}

export default {
  getAllPlaces,
};
