const app = new Vue({
    el: '#app',

    data: {
        contacts : [
            {
                name: 'Michele',
                avatar: '_1',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        text: 'Hai portato a spasso il cane?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        text: 'Ricordati di dargli da mangiare',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 16:15:22',
                        text: 'Tutto fatto!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Fabio',
                avatar: '_2',
                visible: true,
                messages: [
                    {
                        date: '20/03/2020 16:30:00',
                        text: 'Ciao come stai?',
                        status: 'sent'
                    },
                    {
                        date: '20/03/2020 16:30:55',
                        text: 'Bene grazie! Stasera ci vediamo?',
                        status: 'received'
                    },
                    {
                        date: '20/03/2020 16:35:00',
                        text: 'Mi piacerebbe ma devo andare a fare la spesa.',
                        status: 'sent'
                    }
                ],
            },
        
            {
                name: 'Samuele',
                avatar: '_3',
                visible: true,
                messages: [
                    {
                        date: '28/03/2020 10:10:40',
                        text: 'La Marianna va in campagna',
                        status: 'received'
                    },
                    {
                        date: '28/03/2020 10:20:10',
                        text: 'Sicuro di non aver sbagliato chat?',
                        status: 'sent'
                    },
                    {
                        date: '28/03/2020 16:15:22',
                        text: 'Ah scusa!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Luisa',
                avatar: '_4',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        text: 'Lo sai che ha aperto una nuova pizzeria?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        text: 'Si, ma preferirei andare al cinema',
                        status: 'received'
                    }
                ],
            },
        ],

        activeContact : 0,

        activeMsg : -1,

        textChat: '',
        
        lookingForContact: '',

    },

    computed: {
        
        /**
         * Computed property to get the last time the contact
         * was online sending a message to the user
         * @returns the last time seen online
         */
         lastAccess: function() {
            const temporary = this.contacts[this.activeContact].messages;
            for (let i = temporary.length - 1; i >= 0; i--)
            {
                if(temporary[i].status == 'received')
                {
                    return temporary[i].date;
                }
            }
        },

        // lastText: function() {
        //     const temp = this.contacts[this.activeContact];
        //     return temp.messages[temp.messages.length-1].text
        // }

    },

    methods: {
        /**
         * 
         * @param {number} index the current selected contact
         */
        selectContact(index) {
            this.activeContact = index;
            this.activeMsg = -1;
        },

        selectMsg(index) {
            this.activeMsg == index ? this.activeMsg = -1 : this.activeMsg = index;
        },
        /**
         * Function to get the date of the current time
         * @returns a string of the current time
         */
        getTime() {
            const now = new Date();
            return (now.getDate() < 10 ? '0' : '') + now.getDate() + "/" 
                + ((now.getMonth()+1) < 10 ? '0' : '') + (now.getMonth()+1) + "/"
                + now.getFullYear() + " "
                + ((now.getHours()+1) < 10 ? '0' : '') + now.getHours() + ':'
                + ((now.getMinutes()+1) < 10 ? '0' : '') + now.getMinutes() + ':'
                + ((now.getSeconds()+1) < 10 ? '0' : '') + now.getSeconds();
        },

        /**
         * Function that add a message to the text sent
         * adding it to the messages sent
         */ 
        textSent() {
            const obj = {
                date: this.getTime(),
                text: this.textChat.trim(),
                status: 'sent',
            }            
            this.contacts[this.activeContact].messages.push(obj);
            this.textChat = '';

            setTimeout (this.textReceivedOK, 1000, this.activeContact);
        },

        /**
         * Function that automatically respond to the text received
         * adding it to the messages received
         * @param {number} index of the user who was getting the message 
         */        
        textReceivedOK(index) {
            const obj = {
                date: this.getTime(),
                text: 'ok',
                status: 'received',
            }
            this.contacts[index].messages.push(obj);
        },

        lastText(array) {
            return array.messages.length ? array.messages[array.messages.length-1].text : '';
            // if (array.messages.length)
            // {
            //     return array.messages[array.messages.length-1].text;
            // }
            // else
            // {
            //     return '';
            // }
        },

        lastTime(array) {
            return array.messages.length ? array.messages[array.messages.length-1].date : '';
        },

        removeMsg(index) {
            console.log(index);
            const temporary = this.contacts[this.activeContact].messages;
            temporary.splice(index, 1);
            console.table(temporary);

            // To stop showing the dropdown menu
            this.activeMsg = -1;
        },

        // searchBarFilter: function(text) {
        //     console.log(text);
        //     for (element of this.contacts)
        //     {                
        //         if (element.name.toLowerCase().includes(this.lookingForContact.trim().toLowerCase()))
        //         {
        //             element.selected = false;
        //             console.table(element);
        //         }
        //         else{
        //             element.selected = true;
        //             console.table(element);
        //         }
        //     }                    
        // }

        removeActiveMsgClick() {
            this.activeMsg = -1;
        }
    },

})