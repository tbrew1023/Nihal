// Change the configurations.  
var config = {
    apiKey: "AIzaSyCHpz4ty7srkDV3AiUDZJLFEOfYGLMpqUM",
    authDomain: "nihal-819a6.firebaseapp.com",
    databaseURL: "https://nihal-819a6.firebaseio.com",
    projectId: "nihal-819a6",
    storageBucket: "nihal-819a6.appspot.com",
    messagingSenderId: "489064704671"
}
    
// Initialize Firebase.
firebase.initializeApp(config);

var storage = firebase.storage();
const firestore = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true};
firestore.settings(settings);

new Vue({
    el: "#app",
    firestore() {
        return {
            items: firebase.firestore().collection("portfolioItems")
        }
    },
    data(){
        var creditNum = 1
        return {
            item: {
                title: "",
                genre: "",
                summary: "",
                credits: [
                    {
                        role: "",
                        name: ""
                    }
                ],
                screenGrabs: [
                    ""
                ]
            }
        }
    },
    methods: {
        add() {
            console.log('clicked')
            this.$firestore.items.add(this.item).then(()=>{
                this.item.title = "",
                this.item.genre = "",
                this.item.summary = "",
                this.item.credits = [
                    {
                        role: "",
                        name: ""
                    }
                ],
                this.item.screenGrabs = [
                    ""
                ]
            })
        },
        remove(e) {
            this.$firestore.items.doc(e['.key']).delete()
        },
        newCredit() {
            this.item.credits.push(
                {
                    role: "",
                    name: ""
                }
            );
        },
        newScreenGrab() {
            console.log("pushed new screengrab")
            this.item.screenGrabs.push(
                ""
            );
        },
        handleUpload(e) {
            console.log("..........handling upload for " + this.item.title);

            var file = e.target.files[0];

            console.log("path: " + this.item.title + "/" + file.name);

            //create a storage ref
            var storageRef = storage.ref(this.item.title + "/" + file.name);

            //upload file
            var task = storageRef.put(file);

            //update progress bar
            task.on('state_changed', 
            
                function progress(snapshot) {
                    var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    uploader.value = percentage;
                },
                function error(err) {

                },
                function complete() {

                }
            
            )

        }
    }
})