
# Create a game of tic-tac-toe following the following rules:

* It will use the backend in C#
* It’s a multiplayer game, using websockets (signalR) as communication
*    It should have a lounge view/page where you can request a game to another user waiting there
* If the user accepts the request, both will navigate to a different view where the game will happen
    * This view will show the game board with the current state of the game
    * It will show on the sidebar the statistics between both players
        * How many games have been played between those players
        * How many wins for either players and how many draws
    * The game will continue until no more moves are needed or available (if there’s a clear winner or a draw)
    * The board should show who is playing the currently turn
    * The players should only be able to move a piece on their turn
    * In the end of the game, the player should have the option to play another game or go back to the lobby
* The lobby should have a list with the current ongoing games where they can watch (but not participate) the game being played
    * The viewer should have the possibility to leave the play view at any time
* There should be a panel or  a link to a different view with the global statistics
    * The global statics should show the total amount of games played in the system
    * It should have a list of players saying how many games they won, lost and draw
