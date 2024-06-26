/* 
@author ignisterra
@creationDate 2024/05/16
@lastUpdate 2024/05/16
@version 1

@description Training
*/

const alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];

var message = "v ubcfb osu ymoqsuu n cxqfj dqmfnu ub vjcfqu juz amqjmruz zmsscfusb bquflu auoquz hfszbms zwfba ju wusbms qusbqu ncsz ju vmo z uddmqvcfb n uxfbuq ju xusb wcoxcfz fj eczzc qcefnuwusb jc emqbu xfbquu no ijmv nuz wcfzmsz nu jc xfvbmfqu ecz czzul qcefnuwusb vueusncsb emoq uweuvauq kou z usrmoddqu us wuwu buwez kou jof os bmoqifjjms nu emozzfuqu ub nu zciju ju acjj zusbcfb ju vamo vofb ub ju xfuog bcefz c j osu nu zuz ugbquwfbuz osu cddfvau nu vmojuoq bqme xczbu emoq vu nuejmfuwusb fsbuqfuoq ubcfb vjmouu co woq ujju quequzusbcfb zfwejuwusb os usmqwu xfzcru jcqru nu ejoz n os wubqu ju xfzcru n os amwwu n usxfqms kocqcsbu vfsk csz c j uecfzzu wmozbcvau smfqu cog bqcfbz cvvusbouz ub iucog hfszbms zu nfqfruc xuqz j uzvcjfuq fj ubcfb fsobfju n uzzcpuq nu equsnqu j czvuszuoq wuwu cog wufjjuoquz uemkouz fj dmsvbfmsscfb qcquwusb cvboujjuwusb n cfjjuoqz ju vmoqcsb ujuvbqfkou ubcfb vmoeu ncsz jc ymoqsuu v ubcfb osu nuz wuzoquz n uvmsmwfu eqfzuz us xou nu jc zuwcfsu nujc acfsu"

/*  
    @functionName isAlphabetChar
    @description Get the position of a letter in French Alphabet
    @args CHAR
    @return INT 
    @returnValue number 0 and 25 otherwise 999999

    @comment /!\ Javascript is not a typed langage so it doesn't really return a variable with a real type /!\
*/

function getKeyPosInAlphabet(char) {
	for(let i = 0 ; i < alphabet.length; i++){
		if(char.toLowerCase() == alphabet[i]){
  		return i
  	}
	}
  return 9999999
}

/*
    @functionName isAlphabetChar
    @description Check if character is from French Alphabet
    @args CHAR
    @return BOOLEAN 
    @returnValue true otherwise false
    

    @comment /!\ Javascript is not a typed langage so it doesn't really get or return a variable with a real type /!\
*/

function isAlphabetChar(char) {
  
	for(let i = 0 ; i < alphabet.length; i++){
		if(char.toLowerCase() == alphabet[i]){
    	//console.log("true character "+char.toLowerCase()+" is in Alphabet at pos "+i);
  		return true;
  	}
	}
  //console.log("false character "+char.toLowerCase()+" is not in Alphabet at pos "+null);
  return false
}

/*
    @functionName decodeVigenere
    @description decode a French message encoded with Friedman Table
    @args crypted, key
    @arg1Value STRING
    @arg2Value STRING
    @arg1Desc The encrypted string
    @arg2Desc The symetric key use for encryption
    @return STRING 
    @returnValue decode message 
    

    @comment /!\ Javascript is not a typed langage so it doesn't really get or return a variable with a real type /!\
*/

function decodeVigenere(crypted, key) {
	if(key.length < 1){
		return "ERROR: KEY IS MANDATORY !"  
  }
  if(key == " "){
		return "ERROR: KEY MUST BE A LETTER FROM ALPHABET !"  
  }
  
  for(let i = 0; i < key.length; i++){
  	if(!isAlphabetChar(key[i])){
    	return "ERROR: KEY CONTAINS NON ALPHABETIC CHARACTER !"
    }
  }
  if(crypted.length < 1){
		return "ERROR: NOTHING TO DECODE (EMPTY MESSAGE)"  
  }
  
	let keyCurrentPos = 0;
	let keyCurrentChar = "";
	let kCCDFA = 0;
  let cCCDFA = 0;
	let alphabetPos = 0;
  let diffPosKC = 0;
	let result = "";
  key = key.toLowerCase();
  //console.log("Crypted Length: "+crypted.length)
  //console.log("Key Length: "+key.length)
	for(let i = 0; i < crypted.length ; i++){
  	/*
  	console.log("Current char is: "+crypted[i]);
    if (crypted[i]==crypted[i].toLowerCase()){
    console.log(crypted[i]+" est en minuscule");
    }
    else {
    console.log(crypted[i]+" est en Majuscule");
    }
    */
    if( isAlphabetChar(crypted[i].toLowerCase()) ){
      //console.log("key Length: "+key.length);
      keyCurrentChar=key[keyCurrentPos];
      //console.log("keyCurrentPos: "+keyCurrentPos);
    	//console.log("keyCurrentChar: "+key[keyCurrentPos]);
  		kCCDFA = getKeyPosInAlphabet(keyCurrentChar);
      //console.log("kCCDFA: "+kCCDFA);
    	cCCDFA = getKeyPosInAlphabet(crypted[i].toLowerCase());
      //console.log("cCCDFA: "+cCCDFA);
      
    	diffPosKC = cCCDFA-kCCDFA;
      //console.log("diff before compare: "+diffPosKC)
    	if(diffPosKC >= 0) {
    		 if( crypted[i] == crypted[i].toLowerCase() ){
        	result = result+alphabet[diffPosKC];
        }
        else {
       	 result = result+alphabet[diffPosKC].toUpperCase();
        }
        //result = result+alphabet[diffPosKC];
    	}
    	else {
     		diffPosKC = 25+diffPosKC+1;
				//console.log(alphabet[diffPosKC]);
        if( crypted[i] == crypted[i].toLowerCase() ){
        	result = result+alphabet[diffPosKC];
        }
        else {
       	 result = result+alphabet[diffPosKC].toUpperCase();
        }
    	}
      if( (keyCurrentPos < key.length-1) && (key.length > 1) ){
        //console.log("keyCurrentPos: "+keyCurrentPos)
    		keyCurrentPos++;
  		}
  		else {
    		keyCurrentPos = 0;
  		}
      //console.log(result);
	  }
    else {
    	if(crypted[i] == "'"){
      	result = result+"\'";
      }
      else {
      	result = result+crypted[i];
      }
      
    }
  }
  return result;
  //console.log(result);
}

/*
    @functionName generateVigenereTable
    @description generate the Vigenerene Table for French Alphabet (generated from decodeVigenere function)
    

    @comment Void Function, takes no arg, return nothing. Only console log for testing purpose
*/

function generateVigenereTable(){
console.log("Vigenere Table (generated from decoder)");
console.log("=======================================");
console.log("First line = Letter in cleartext message");
console.log("First row = Letter composing the key");
console.log("Matching the a letter (in first line) and the corresponding letter \n from the key (first row) = encoded character");
console.log("Repeat for each character until the message is totally encoded");
console.log("/!\\ IGNORE NON ALPHABETIC CHARACTER /!\\ ");
console.log("------------------------------------------------------------------")
console.log("* ABCDEFGHIJKLMNOPQRSTUVWXYZ");
console.log("A "+decodeVigenere("abcdefghijklmnopqrstuvwxyz","a"));
	for(let i = 1; i < alphabet.length; i++){
		console.log(alphabet[i].toUpperCase()+" "+decodeVigenere("abcdefghijklmnopqrstuvwxyz",alphabet[26-i]));
	}
}
// Log to console
//console.log(getKeyPosInAlphabet("9"));
//console.log(isAlphabetChar("a"));
//console.log(alphabet[25]);
//console.log(decodeVigenere("Gqfltwj emgj clgfv ! Aqltj rjqhjsksg ekxuaqs, ua xtwk n'feuguvwb gkwp xwj, ujts f'npxkqvjgw nw tjuwcz ugwygjtfkf qz uw efezg sqk gspwonu. Jgsfwb-aqmu f Pspygk nj 29 cntnn hqzt dg igtwy fw xtvjg rkkunqf.","FCSC"));
console.log(decodeVigenere(message, "HTAFPIXKBLQZODUWRGNYECMVJS"));
//generateVigenereTable()