class Listener {
  constructor(playlistSongService, mailSender) {
    this._playlistSongService = playlistSongService;
    this._mailSender = mailSender;

    this.listen = this.listen.bind(this);
  }

  async listen(message) {
    try {
      const { playlistId, targetEmail } = JSON.parse(message.content.toString());
      const playlist = await this._playlistSongService.getPlaylists(playlistId);
      const Songs = await this._playlistSongService.getSongs(playlistId);

      const detailsPlaylist = {
        playlist: {
          ...playlist,
          songs: Songs,
        },
      };
      console.log(detailsPlaylist);
      const result = await this._mailSender.sendMail(targetEmail, JSON.stringify(detailsPlaylist));
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Listener;
