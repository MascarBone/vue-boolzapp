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



        // obj.name.toLowerCase().includes(this.lookingForContact.trim().toLowerCase())
             
        
        inputSearch: {
            get: function() {                
                console.log('get');
                return this.lookingForContact;
            },

            set: function(newValue) {
                console.log(newValue);
                for (element of this.contacts)
                {
                    console.log('set')

                    // console.log(element);
                    if (element.name.toLowerCase().includes(newValue.trim().toLowerCase()))
                    {
                        element.visible = true;
                    }else {
                        element.visible = false;
                    }
                    console.log(element.visible);
                }
                this.lookingForContact = newValue;
            }
           
        }

    },

    methods: {
        /**
         * Function to set the property 'activeContact' to the clicked contacts
         * and will reset the 'activeMsg' property to default(-1)
         * 
         * @param {number} index the current selected contact
         */
        selectContact(index) {
            this.activeContact = index;
            this.activeMsg = -1;
        },

        /**
         * Function to set the property 'activeMsg' to the clicked message
         * 
         * @param {number} index of the currenct selected message 
         */
        selectMsg(index) {
            this.activeMsg == index ? this.activeMsg = -1 : this.activeMsg = index;
        },
        /**
         * Function to get the date of the current time
         * 
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
         * 
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

        /**
         * Function to show a message as preview below a contact
         * 
         * @param {object} object that contains the property(array) 'messages'
         * @returns string that rapresent part of the last message in chat 
         */
        lastText(obj) {
            
            return obj.messages.length ? obj.messages[obj.messages.length-1].text.substring(0,30) + '...' : '' ;
                        
            // if (obj.messages.length)
            // {
            //     return obj.messages[obj.messages.length-1].text;
            // }
            // else
            // {
            //     return '';
            // }
        },

        /**
         * Function to show the time of the last message
         * 
         * @param {object} object that contains the property(array) 'messages'
         * @returns string that rapresent the time of the last message
         */
        lastTime(obj) {
            return obj.messages.length ? obj.messages[obj.messages.length-1].date : '';
        },


        /**
         * Function that remove a message from the list of messages of a contact
         * 
         * @param {number} index that point to the actual message has been selected
         */
        removeMsg(index) {
            const temporary = this.contacts[this.activeContact].messages;
            temporary.splice(index, 1);

            // To stop showing the dropdown menu
            this.activeMsg = -1;
        },

        /**
         * Function that everytime a click happens outside of a message box
         * the 'activeMsg' will be reset and will hide the dropdown shown before
         */
        removeActiveMsgClick() {
            this.activeMsg = -1;
        },

        /**
         * Function that confronts 'lookingForContact' with the property 'name' of a contact
         * to see if there's a match, then v-if will only show the ones returning true
         * 
         * @param {object} obj rapresenting the current contact v-for is cycling
         * @returns true or false
         */
        // searchBarFilter: function(obj) {
        //     console.log(obj);
        //     if(obj.name.toLowerCase().includes(this.lookingForContact.trim().toLowerCase()))
        //     {
        //         return true;
        //     }
        //     return false;
        // }

        // Sobstitute of the method above
        searchBarUp() {
            console.log('hey');
            for(element of this.contacts)
            {
                if(element.name.toLowerCase().includes(this.inputSearch.trim().toLowerCase()))
                {
                    element.visible = true;
                }else {
                    element.visible = false;
                }
            }
        }
    },

})