(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.nx = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

module.exports = {};

},{}],2:[function(require,module,exports){
"use strict";

module.exports = {
  0: "[root [nsubj I] have [obj [amod [advmod too] many] commitments] [advmod right now] [punct .]]"
};

},{}],3:[function(require,module,exports){
"use strict";

module.exports = {
	equals: "# sent_id = mst-0001\n# text = Pe\u015Freve ba\u015Flamal\u0131.\n\"<Pe\u015Freve>\"\n\t\"pe\u015Frev\" Noun @obl #1->2\n\"<ba\u015Flamal\u0131>\"\n\t\"ba\u015Fla\" Verb SpaceAfter=No @root #2->0\n\"<.>\"\n\t\".\" Punc @punct #3->2",

	x_and_u_postag: "# text = \xD1e'\u1EBDngu\xE9ra i\xF1e'\u1EBDrapoambu\xE9va (lenguas de flexi\xF3n), umi \xF1e'\u1EBDte indoeuropeo-icha.\n# text[spa] = Las lenguas de flexi\xF3n, aquellas lenguas como indoeuropeas.\n# labels =\n\"<\xD1e\u02BC\u1EBDngu\xE9ra>\"\n\t\"\xF1e\u02BC\u1EBD\" n @nsubj #1->\n\t\t\"ku\xE9ra\" det pl @det #2->1\n\"<i\xF1e\u02BC\u1EBDrapoambu\xE9va>\"\n\t\"i\xF1e\u02BC\u1EBDrapoambu\xE9va\" adj @amod #3->1\n\"<(>\"\n\t\"(\" lpar @punct #4->5\n\"<lenguas>\"\n\t\"lenguas\" barb @appos #5->1\n\"<de>\"\n\t\"de\" barb @foreign #6->7\n\"<flexi\xF3n>\"\n\t\"flexi\xF3n\" barb @foreign #7->5\n\"<)>\"\n\t\")\" rpar @punct #8->5\n\"<,>\"\n\t\",\" cm @punct #9->\n\"<umi>\"\n\t\"umi\" adj dem pl @amod #10->11\n\"<\xF1e\u02BC\u1EBDte>\"\n\t\"\xF1e\u02BC\u1EBD\" n @obl #11->\n\t\t\"te\" post @case #12->11\n\"<indoeuropeo-icha>\"\n\t\"indoeuropeo\" barb @amod #13->11\n\t\t\"icha\" comp @dep #14->13\n\"<.>\"\n\t\".\" sent @punct #15->",

	nested: "# sent_id = wikipedia:Poyvi_Paragu\xE1i:11\n# text = Poyvi pete\u0129ha \xF1ane ret\xE3megua niko ojepuru\u2019yp\xFDkuri 15 jasypo guive 16 jasypote\u0129 meve ary 1811-pe.\n# text[spa] = Bandera uno nosotros de-de _ \xE9l-se-utiliz\xF3-_ 15 maio desde 16 junio hasta a\xF1o 1811-en.\n\"<Poyvi>\"\n\t\"poyvi\" n\n\"<pete\u0129ha>\"\n\t\"pete\" n incp\n\t\t\"\u0129\" v tv pres\n\t\t\t\"ha\" subs\n\t\"pete\u0129ha\" num\n\"<\xF1ane>\"\n\t\"\xF1and\xE9\" prn pers p1 incl pl\n\"<ret\xE3megua>\"\n\t\"*ret\xE3megua\"\n\"<niko>\"\n\t\"*niko\"\n\"<ojepuru\u02BCyp\xFDkuri>\"\n\t\"*ojepuru\u02BCyp\xFDkuri\"\n\"<15>\"\n\t\"15\" num @amod\n\"<jasypo>\"\n\t\"ja\" n incp\n\t\t\"sy\" n incp\n\t\t\t\"po\" n\n\t\"ja\" n incp\n\t\t\"sy\" n incp\n\t\t\t\"po\" v iv pres\n\t\"ja\" n incp\n\t\t\"sy\" n incp\n\t\t\t\"po\" v tv pres\n\t\"ja\" prn p1 pl\n\t\t\"sy\" n incp\n\t\t\t\"po\" n\n\t\"ja\" prn p1 pl\n\t\t\"sy\" n incp\n\t\t\t\"po\" v iv pres\n\t\"ja\" prn p1 pl\n\t\t\"sy\" n incp\n\t\t\t\"po\" v tv pres\n\t\"jasy\" n incp\n\t\t\"po\" n\n\t\"jasy\" n incp\n\t\t\"po\" v iv pres\n\t\"jasy\" n incp\n\t\t\"po\" v tv pres\n\t\"jasypo\" n\n\"<guive>\"\n\t\"guive\" post @case\n\"<16>\"\n\t\"16\" num @amod\n\"<jasypote\u0129>\"\n\t\"jasypote\u0129\" n\n\"<meve>\"\n\t\"peve\" post @case\n\"<ary>\"\n\t\"ary\" n\n\"<1811-pe>\"\n\t\"1811\" num\n\t\t\"pe\" post @case",

	/*nested_2: `"<ab>"
 	"A" #1->
 		"B" #2->
 "<cde>"
 	"C" #3->
 		"D" #4->
 			"E" #5->
 "<f>"
 	"F" #6->
 "<h>"
 	"H" #7->`,*/

	kdt_tagged_1: "# https://github.com/apertium/apertium-kaz/blob/master/texts/kdt.tagged.txt\n\"<\u04E8\u0441\u043A\u0435\u043C\u0435\u043D\u043D\u0456\u04A3>\"\n\t\"\u04E8\u0441\u043A\u0435\u043C\u0435\u043D\" np top gen @nmod:poss #1->3\n\"<\u0430\u0440>\"\n\t\"\u0430\u0440\" adj @amod #2->3\n\"<\u0436\u0430\u0493\u044B\u043D\u0434\u0430>\"\n\t\"\u0436\u0430\u049B\" n px3sp loc @conj #3->7\n\"<,>\"\n\t\",\" cm @punct #4->7\n\"<\u0411\u04B1\u049B\u0442\u044B\u0440\u043C\u0430\u043D\u044B\u04A3>\"\n\t\"\u0411\u04B1\u049B\u0442\u044B\u0440\u043C\u0430\" np top gen @nmod:poss #5->7\n\"<\u043E\u04A3>\"\n\t\"\u043E\u04A3\" adj @amod #6->7\n\"<\u0436\u0430\u0493\u044B\u043D\u0434\u0430>\"\n\t\"\u0436\u0430\u049B\" n px3sp loc @nmod #7->11\n\"<\u04D9\u043B\u0435\u043C\u0433\u0435>\"\n\t\"\u04D9\u043B\u0435\u043C\" n dat @nmod #8->9\n\"<\u0430\u044F\u043D>\"\n\t\"\u0430\u044F\u043D\" adj @acl #9->10\n\"<\u0410\u043B\u0442\u0430\u0439>\"\n\t\"\u0410\u043B\u0442\u0430\u0439\" np top nom @nsubj #10->11\n\"<\u0431\u0430\u0440>\"\n\t\"\u0431\u0430\u0440\" adj @root #11->0\n\t\t\"\u0435\" cop aor p3 sg @cop #12->11\n\"<.>\"\n\t\".\" sent @punct #13->11",

	kdt_tagged_2: "# https://github.com/apertium/apertium-kaz/blob/master/texts/kdt.tagged.txt\n\"<\u0410\u0442\u0442\u0430\u043D>\"\n\t\"\u0430\u0442\u0442\u0430\u043D\" v iv imp p2 sg @root #1->0\n\"<!>\"\n\t\"!\" sent @punct #2->1",

	kdt_tagged_3: "# https://github.com/apertium/apertium-kaz/blob/master/texts/kdt.tagged.txt\n\"<\u041C\u0430\u043D\u0430\u0493\u044B>\"\n\t\"\u043C\u0430\u043D\u0430\u0493\u044B\" det dem @det #1->3\n\"<\u0430\u043B\u0430>\"\n\t\"\u0430\u043B\u0430\" adj @amod #2->3\n\"<\u0430\u0442\u0442\u044B>\"\n\t\"\u0430\u0442\u0442\u044B\" adj subst nom @nsubj #3->4\n\"<\u043A\u0456\u043C>\"\n\t\"\u043A\u0456\u043C\" prn itg nom @root #4->0\n\t\t\"\u0435\" cop aor p3 sg @cop #5->4\n\"<?>\"\n\t\"?\" sent @punct #6->4",

	0: "\"<\u041F\u0430\u0442\u0448\u0430\u043C\u0435\u043D>\"\n\t\"\u043F\u0430\u0442\u0448\u0430\" n ins @nmod #1->3\n\"<\u0441\u043E\u0493\u044B\u0441>\"\n\t\"\u0441\u043E\u0493\u044B\u0441\" n nom @obj #2->3\n\"<\u0430\u0448\u049B\u0430\u043D\u0434\u0430>\"\n\t\"\u0430\u0448\" v tv ger_past loc @advcl #3->12\n\"<,>\"\n\t\",\" cm @punct #4->12\n\"<\u0435\u043B-\u0436\u04B1\u0440\u0442>\"\n\t\"\u0435\u043B-\u0436\u04B1\u0440\u0442\" n nom @conj #5->7\n\"<,>\"\n\t\",\" cm @punct #6->7\n\"<\u043E\u0442\u0430\u043D\u044B\u043C\u0434\u044B>\"\n\t\"\u043E\u0442\u0430\u043D\" n px1sg acc @obj #7->8\n\"<\u049B\u043E\u0440\u0493\u0430\u0443\u0493\u0430>\"\n\t\"\u049B\u043E\u0440\u0493\u0430\" v tv ger dat @advcl #8->12\n\"<,>\"\n\t\",\" cm @punct #9->12\n\"<\u0431\u0456\u0437>\"\n\t\"\u0431\u0456\u0437\" prn pers p1 pl nom @nsubj #10->12\n\"<\u0441\u043E\u0493\u044B\u0441\u049B\u0430>\"\n\t\"\u0441\u043E\u0493\u044B\u0441\" n dat @nmod #11->12\n\"<\u0431\u0430\u0440\u0434\u044B\u049B>\"\n\t\"\u0431\u0430\u0440\" v iv ifi p1 pl @root #12->0\n\"<.>\"\n\t\".\" sent @punct #13->12",

	1: "# text = He boued e tebr Mona er gegin.\n# text[eng] = Mona eats her food here in the kitchen.\n# labels = press_1986 ch_syntax p_197 to_check\n\"<He>\"\n\t\"he\" det pos f sp @det #1->2\n\"<boued>\"\n\t\"boued\" n m sg @obj #2->4\n\"<e>\"\n\t\"e\" vpart obj @aux #3->4\n\"<tebr>\"\n\t\"debri\xF1\" vblex pri p3 sg @root #4->0\n\"<Mona>\"\n\t\"Mona\" np ant f sg @nsubj #5->4\n\"<er>\"\n\t\"e\" pr @case #6->8\n\t\t\"an\" det def sp @det #7->8\n\"<gegin>\"\n\t\"kegin\" n f sg @obl #8->4\n\"<.>\"\n\t\".\" sent @punct #9->4",

	2: "# text = He boued e tebr Mona er gegin.\n# text[eng] = Mona eats her food here in the kitchen.\n# labels = press_1986 ch_syntax p_197 to_check\n\"<He>\"\n\t\"he\" det pos f sp @det #1->2\n\"<boued>\"\n\t\"boued\" n m sg @obj #2->4\n\"<e>\"\n\t\"e\" vpart obj @aux #3->4\n\"<tebr>\"\n\t\"debri\xF1\" vblex pri p3 sg @root #4->0\n\"<Mona>\"\n\t\"Mona\" np ant f sg @nsubj #5->4\n\"<er>\"\n\t\"e\" pr @case #6->8\n\t\t\"an\" det def sp @det #7->8\n\"<gegin>\"\n\t\"kegin\" n f sg @obl #8->4\n\t\"kegin\" n f pl @obl #9->\n\"<.>\"\n\t\".\" sent @punct #10->4", // note: changed line `"kegin" n f pl @obl #8->4`

	with_semicolumn: "\n\"<Siedzieli\u015Bmy>\"\n\t\"siedzie\u0107\" vblex impf past p1 m pl\n\"<w>\"\n\t\"w\" pr\n\"<moim>\"\n;   \"m\xF3j\" prn pos mi sg loc\n\"<pokoju>\"\n\t\"pok\xF3j\" n mi sg loc\n\"<,>\"\n\t\",\" cm\n\"<pal\u0105c>\"\n\t\"pali\u0107\" vblex impf pprs adv\n\"<i>\"\n\t\"i\" cnjcoo\n\"<rozmawiaj\u0105c>\"\n\t\"rozmawia\u0107\" vblex impf pprs adv\n\"<o>\"\n\t\"o\" pr\n\"<tem>\"\n\t\"to\" prn dem mi sg loc\n\"<,>\"\n\t\",\" cm\n\"<jak>\"\n\t\"jak\" rel adv\n\"<marni>\"\n\t\"marny\" adj sint mp pl nom\n\"<jeste\u015Bmy>\"\n\t\"by\u0107\" vbser pres p1 pl\n\"<,>\"\n\t\",\" cm\n\"<marni>\"\n\t\"marny\" adj sint mp pl nom\n\"<z>\"\n\t\"z\" pr\n\"<lekarskiego>\"\n\t\"lekarski\" adj mi sg gen\n\"<punktu>\"\n\t\"punkt\" n mi sg gen\n\"<widzenia>\"\n;   \"widzie\u0107\" vblex impf ger nt sg gen\n\"<chc\u0119>\"\n\t\"chcie\u0107\" vblex impf pres p1 sg\n\"<powiedzie\u0107>\"\n\t\"powiedzie\u0107\" vblex perf inf\n\"<,>\"\n\t\",\" cm\n\"<naturalnie>\"\n\t\"naturalnie\" adv sint\n\"<.>\"\n\t\".\" sent",

	simple: "\"<\u041F\u0430\u0442\u0448\u0430\u043C\u0435\u043D>\"\n\t\"\u043F\u0430\u0442\u0448\u0430\" n ins @nmod #1->3\n\"<\u0441\u043E\u0493\u044B\u0441>\"\n\t\"\u0441\u043E\u0493\u044B\u0441\" n nom @obj #2->3\n\"<\u0430\u0448\u049B\u0430\u043D\u0434\u0430>\"\n\t\"\u0430\u0448\" v tv ger_past loc @advcl #3->12\n\"<,>\"\n\t\",\" cm @punct #4->12\n\"<\u0435\u043B-\u0436\u04B1\u0440\u0442>\"\n\t\"\u0435\u043B-\u0436\u04B1\u0440\u0442\" n nom @conj #5->7\n\"<,>\"\n\t\",\" cm @punct #6->7\n\"<\u043E\u0442\u0430\u043D\u044B\u043C\u0434\u044B>\"\n\t\"\u043E\u0442\u0430\u043D\" n px1sg acc @obj #7->8\n\"<\u049B\u043E\u0440\u0493\u0430\u0443\u0493\u0430>\"\n\t\"\u049B\u043E\u0440\u0493\u0430\" v tv ger dat @advcl #8->12\n\"<,>\"\n\t\",\" cm @punct #9->12\n\"<\u0431\u0456\u0437>\"\n\t\"\u0431\u0456\u0437\" prn pers p1 pl nom @nsubj #10->12\n\"<\u0441\u043E\u0493\u044B\u0441\u049B\u0430>\"\n\t\"\u0441\u043E\u0493\u044B\u0441\" n dat @nmod #11->12\n\"<\u0431\u0430\u0440\u0434\u044B\u049B>\"\n\t\"\u0431\u0430\u0440\" v iv ifi p1 pl @root #12->0\n\"<.>\"\n\t\".\" sent @punct #13->12",

	simple_with_comments: "# comment #1\n# comment #2\n\"<\u041F\u0430\u0442\u0448\u0430\u043C\u0435\u043D>\"\n\t\"\u043F\u0430\u0442\u0448\u0430\" n ins @nmod #1->3\n\"<\u0441\u043E\u0493\u044B\u0441>\"\n\t\"\u0441\u043E\u0493\u044B\u0441\" n nom @obj #2->3\n\"<\u0430\u0448\u049B\u0430\u043D\u0434\u0430>\"\n\t\"\u0430\u0448\" v tv ger_past loc @advcl #3->12\n\"<,>\"\n\t\",\" cm @punct #4->12\n\"<\u0435\u043B-\u0436\u04B1\u0440\u0442>\"\n\t\"\u0435\u043B-\u0436\u04B1\u0440\u0442\" n nom @conj #5->7\n\"<,>\"\n\t\",\" cm @punct #6->7\n\"<\u043E\u0442\u0430\u043D\u044B\u043C\u0434\u044B>\"\n\t\"\u043E\u0442\u0430\u043D\" n px1sg acc @obj #7->8\n\"<\u049B\u043E\u0440\u0493\u0430\u0443\u0493\u0430>\"\n\t\"\u049B\u043E\u0440\u0493\u0430\" v tv ger dat @advcl #8->12\n\"<,>\"\n\t\",\" cm @punct #9->12\n\"<\u0431\u0456\u0437>\"\n\t\"\u0431\u0456\u0437\" prn pers p1 pl nom @nsubj #10->12\n\"<\u0441\u043E\u0493\u044B\u0441\u049B\u0430>\"\n\t\"\u0441\u043E\u0493\u044B\u0441\" n dat @nmod #11->12\n\"<\u0431\u0430\u0440\u0434\u044B\u049B>\"\n\t\"\u0431\u0430\u0440\" v iv ifi p1 pl @root #12->0\n\"<.>\"\n\t\".\" sent @punct #13->12",

	with_spans: "# text = He boued e tebr Mona er gegin.\n# text[eng] = Mona eats her food here in the kitchen.\n# labels = press_1986 ch_syntax p_197 to_check\n\"<He>\"\n\t\"he\" det pos f sp @det #1->2\n\"<boued>\"\n\t\"boued\" n m sg @obj #2->4\n\"<e>\"\n\t\"e\" vpart obj @aux #3->4\n\"<tebr>\"\n\t\"debri\xF1\" vblex pri p3 sg @root #4->0\n\"<Mona>\"\n\t\"Mona\" np ant f sg @nsubj #5->4\n\"<er>\"\n\t\"e\" pr @case #6->8\n\t\t\"an\" det def sp @det #7->8\n\"<gegin>\"\n\t\"kegin\" n f sg @obl #8->4\n\"<.>\"\n\t\".\" sent @punct #9->4",

	apertium_kaz_1: "# https://bpaste.net/show/be7c03e6213e\n\"<\u0427\u0430\u0443>\"\n\t\"*\u0427\u0430\u0443\"\n\"<->\"\n\t\"\u0445\" guio\n\t\"-\" guio\n\"<\u0447\u0430\u0443>\"\n\t\"*\u0447\u0430\u0443\"\n\"<\u0448\u044B\u0493\u0443>\"\n\t\"\u0448\u044B\u0493\u0443\" n attr\n\t\"\u0448\u044B\u049B\" v tv ger nom\n\t\"\u0448\u044B\u049B\" v iv ger nom\n\t\"\u0448\u044B\u0493\u0443\" n nom\n;\t\"\u0448\u044B\u0493\u0443\" n nom\n;\t\t\"\u0435\" cop aor p3 pl REMOVE:294\n;\t\"\u0448\u044B\u0493\u0443\" n nom\n;\t\t\"\u0435\" cop aor p3 sg REMOVE:294\n;\t\"\u0448\u044B\u049B\" vaux ger nom REMOVE:766\n\"<\u0442\u0435\u0433\u0456\u043D\u0435\u043D>\"\n\t\"\u0442\u0435\u043A\" n px3sp abl\n;\t\"\u0442\u0435\u043A\" n px3sp abl\n;\t\t\"\u0435\" cop aor p3 pl REMOVE:294\n;\t\"\u0442\u0435\u043A\" n px3sp abl\n;\t\t\"\u0435\" cop aor p3 sg REMOVE:294\n\"<\u0448\u043F\u0438\u0446\u0442\u0435\u0440>\"\n\t\"*\u0448\u043F\u0438\u0446\u0442\u0435\u0440\"\n\"<\u0442\u043E\u0431\u044B\u043D\u0430>\"\n\t\"\u0442\u043E\u043F\" n px3sp dat\n\"<\u0436\u0430\u0442\u0430\u0434\u044B>\"\n\t\"\u0436\u0430\u0442\" v iv aor p3 sg\n;\t\"\u0436\u0430\u0442\" vaux aor p3 pl REMOVE:766\n;\t\"\u0436\u0430\u0442\" vaux aor p3 sg REMOVE:766\n;\t\"\u0436\u0430\u0442\" v iv aor p3 pl REMOVE:846\n\"<.>\"\n\t\".\" sent",

	apertium_kaz_2: "# https://bpaste.net/show/be7c03e6213e\n\"<\u049A\u0430\u043D\u044B\u043D\u0434\u0430>\"\n\t\"\u049B\u0430\u043D\" n px3sp loc\n;\t\"\u049B\u0430\u043D\" n px3sp loc\n;\t\t\"\u0435\" cop aor p3 pl REMOVE:294\n;\t\"\u049B\u0430\u043D\" n px3sp loc\n;\t\t\"\u0435\" cop aor p3 sg REMOVE:294\n\"<\u0442\u0438\u0431\u0435\u0442>\"\n\t\"*\u0442\u0438\u0431\u0435\u0442\"\n\"<\u0438\u0442\u0456\u043D\u0456\u04A3>\"\n\t\"\u0438\u0442\" n px3sp gen\n\"<(>\"\n\t\"(\" lpar\n\"<\u043C\u0430\u0441\u0442\u0438\u0444>\"\n\t\"*\u043C\u0430\u0441\u0442\u0438\u0444\"\n\"<)>\"\n\t\")\" rpar\n\"<\u049B\u0430\u043D\u044B>\"\n\t\"\u049B\u0430\u043D\" n px3sp nom\n;\t\"\u049B\u0430\u043D\" n px3sp nom\n;\t\t\"\u0435\" cop aor p3 pl REMOVE:294\n;\t\"\u049B\u0430\u043D\" n px3sp nom\n;\t\t\"\u0435\" cop aor p3 sg REMOVE:294\n\"<\u0431\u0430\u0440>\"\n\t\"\u0431\u0430\u0440\" adj SELECT:1118\n\t\"\u0431\u0430\u0440\" adj subst nom SELECT:1118\n\t\t\"\u0435\" cop aor p3 sg\n\t\"\u0431\u0430\u0440\" adj subst nom SELECT:1118\n\t\"\u0431\u0430\u0440\" adj SELECT:1118\n\t\t\"\u0435\" cop aor p3 sg\n;\t\"\u0431\u0430\u0440\" n attr REMOVE:567\n;\t\"\u0431\u0430\u0440\" adj\n;\t\t\"\u0435\" cop aor p3 pl REMOVE:853\n;\t\"\u0431\u0430\u0440\" n nom\n;\t\t\"\u0435\" cop aor p3 pl REMOVE:853\n;\t\"\u0431\u0430\u0440\" adj subst nom\n;\t\t\"\u0435\" cop aor p3 pl REMOVE:853\n;\t\"\u0431\u0430\u0440\" n nom SELECT:1118\n;\t\"\u0431\u0430\u0440\" det qnt SELECT:1118\n;\t\"\u0431\u0430\u0440\" v iv imp p2 sg SELECT:1118\n;\t\"\u0431\u0430\u0440\" n nom SELECT:1118\n;\t\t\"\u0435\" cop aor p3 sg\n\"<\u0434\u0435\u0433\u0435\u043D>\"\n\t\"\u0434\u0435\" v tv gpr_past SELECT:813\n\t\"\u0434\u0435\" v tv gpr_past subst nom SELECT:813\n;\t\"\u0434\u0435\" v tv ger_past nom SELECT:813\n;\t\"\u0434\u0435\" v tv past p3 pl SELECT:813\n;\t\"\u0434\u0435\" v tv past p3 sg SELECT:813\n\"<\u0442\u04B1\u0436\u044B\u0440\u044B\u043C>\"\n\t\"\u0442\u04B1\u0436\u044B\u0440\u044B\u043C\" n nom\n\t\"\u0442\u04B1\u0436\u044B\u0440\u044B\u043C\" n attr\n;\t\"\u0442\u04B1\u0436\u044B\u0440\u044B\u043C\" n nom\n;\t\t\"\u0435\" cop aor p3 pl REMOVE:294\n;\t\"\u0442\u04B1\u0436\u044B\u0440\u044B\u043C\" n nom\n;\t\t\"\u0435\" cop aor p3 sg REMOVE:294\n\"<\u0431\u0430\u0440>\"\n\t\"\u0431\u0430\u0440\" adj\n\t\"\u0431\u0430\u0440\" n nom\n\t\"\u0431\u0430\u0440\" adj\n\t\t\"\u0435\" cop aor p3 sg\n\t\"\u0431\u0430\u0440\" adj subst nom\n\t\t\"\u0435\" cop aor p3 sg\n\t\"\u0431\u0430\u0440\" adj subst nom\n\t\"\u0431\u0430\u0440\" v iv imp p2 sg\n\t\"\u0431\u0430\u0440\" n nom\n\t\t\"\u0435\" cop aor p3 sg\n;\t\"\u0431\u0430\u0440\" det qnt REMOVE:551\n;\t\"\u0431\u0430\u0440\" n attr REMOVE:567\n;\t\"\u0431\u0430\u0440\" adj subst nom\n;\t\t\"\u0435\" cop aor p3 pl REMOVE:853\n;\t\"\u0431\u0430\u0440\" adj\n;\t\t\"\u0435\" cop aor p3 pl REMOVE:853\n;\t\"\u0431\u0430\u0440\" n nom\n;\t\t\"\u0435\" cop aor p3 pl REMOVE:853\n\"<.>\"\n\t\".\" sent",

	ud_annotatrix_issue_397: "# sent_id = Not_eating_larvae:2\n# text = \u0413\u044B\u043C \u043D\u044D\u043C\u044B\u04C4\u044D\u0439 \u043D\u0440\u0437\u0431 \u044D\u0442\u043E \u043D\u044B \u043D\u044B\u0440\u044B\u0447\u0432\u0430\u0513\u044B\u04C8\u044B\u0442\u0442\u044B\u04C4\u044D\u043D\u0430\u0442 \u043D\u044D\u043C\u044B\u04C4\u044D\u0439 \u0433\u044B\u043C \u043D\u044B\u0432\u0438\u043D\u0440\u044D\u0442\u0438\u0433\u044B\u043C \u043D\u044B\u0440\u044B\u0447\u0432\u0430\u043D\u0442\u043E\u0439\u0433\u044B\u043C.\n# text[phon] = \u0263\u0259m nem\u0259qej \u043D\u0440\u0437\u0431 \u044D\u0442\u043E n\u0259 n\u0259r\u0259swa\u026C\u0259\u014B\u0259tt\u0259qenat nem\u0259qej \u0263\u0259m n\u0259winreti\u0263\u0259m n\u0259r\u0259swantoj\u0263\u0259m\n# text[rus] = \u0421\u043E\u0431\u0438\u0440\u0430\u043B\u0438 \u043B\u0438\u0447\u0438\u043D\u043E\u043A, \u044F \u0442\u043E\u0436\u0435 \u043F\u043E\u043C\u043E\u0433\u0430\u043B\u0430, \u0434\u043E\u0441\u0442\u0430\u0432\u0430\u043B\u0430 \u043B\u0438\u0447\u0438\u043D\u043E\u043A.\n# text[eng] = We were gathering the grubs, I also helped, I was extracting the grubs.\n# labels = incomplete\n\"<\u0413\u044B\u043C>\"\n\t\"\u0433\u044B\u043C\" PRON Number=Sing Person=1 PronType=Pers Gloss=\u044F @nsubj #1->6\n\"<\u043D\u044D\u043C\u044B\u04C4\u044D\u0439>\"\n\t\"\u043D\u044D\u043C\u044B\u04C4\u044D\u0439\" ADV Gloss=\u0442\u043E\u0436\u0435 #2->\n\"<\u043D\u0440\u0437\u0431>\"\n\t\"\u043D\u0440\u0437\u0431\" X Gloss= @discourse #3->6\n\"<\u044D\u0442\u043E>\"\n\t\"\u044D\u0442\u043E\" PART Gloss= @discourse #4->6\n\"<\u043D\u044B>\"\n\t\"\u043D\u044B\" X Gloss=FST @reparandum #5->6\n\"<\u043D\u044B\u0440\u044B\u0447\u0432\u0430\u0513\u044B\u04C8\u044B\u0442\u0442\u044B\u04C4\u044D\u043D\u0430\u0442>\"\n\t\"\u043D\u044B\u0440\u044B\u0447\u0432\u0430\u0513\u044B\u04C8\u044B\u0442\u0442\u044B\u04C4\u044D\u043D\u0430\u0442\" VERB Gloss=ST-\u043B\u0438\u0447\u0438\u043D\u043A\u0430-CATCH-ST.3SG-PL @root #6->0\n\"<\u043D\u044D\u043C\u044B\u04C4\u044D\u0439>\"\n\t\"\u043D\u044D\u043C\u044B\u04C4\u044D\u0439\" ADV Gloss=\u0442\u043E\u0436\u0435 @advmod #7->9\n\"<\u0433\u044B\u043C>\"\n\t\"\u0433\u044B\u043C\" PRON Number=Sing Person=1 PronType=Pers Gloss=\u044F @nsubj #8->9\n\"<\u043D\u044B\u0432\u0438\u043D\u0440\u044D\u0442\u0438\u0433\u044B\u043C>\"\n\t\"\u0432\u0438\u043D\u0440\u044D\u0442\u044B\u043A\" VERB Gloss=ST-\u043F\u043E\u043C\u043E\u0433\u0430\u0442\u044C-NP.1SG @parataxis #9->6\n\"<\u043D\u044B\u0440\u044B\u0447\u0432\u0430\u043D\u0442\u043E\u0439\u0433\u044B\u043C>\"\n\t\"\u043D\u044B\u0440\u044B\u0447\u0432\u0430\u043D\u0442\u043E\u0439\u0433\u044B\u043C\" VERB Gloss=ST-\u043B\u0438\u0447\u0438\u043D\u043A\u0430-\u0432\u044B\u043D\u0438\u043C\u0430\u0442\u044C-NP.1SG @parataxis #10->6\n\"<\u0440\u044B\u0447\u0432\u0430>\"\n\t\"\u0440\u044B\u0447\u0432\u0430\" NOUN Gloss=\u043B\u0438\u0447\u0438\u043D\u043A\u0430 @obj #11->10\n\"<.>\"\n\t\".\" PUNCT @punct #12->6"
};

},{}],4:[function(require,module,exports){
"use strict";

module.exports = {
  turkic: "# sent_id = mst-0008\n# text = Ercan Tezer, i\xE7 pazarda bu y\u0131l seksen bin otomobil ve toplam yuzotuz bin ara\xE7 sat\u0131lmas\u0131n\u0131n beklendi\u011Fini kaydederek, \" onalti y\u0131l geriden gidiyoruz \" dedi.\n1\tErcan\tErcan\tPROPN\tProp\tCase=Nom|Number=Sing|Person=3\t26\tnsubj\t_\t_\n2\tTezer\tTezer\tPROPN\tProp\tCase=Nom|Number=Sing|Person=3\t1\tflat\t_\tSpaceAfter=No\n3\t,\t,\tPUNCT\tPunc\t_\t26\tpunct\t_\t_\n4\ti\xE7\ti\xE7\tADJ\tAdj\t_\t16\tamod\t_\t_\n5\tpazarda\tpazar\tNOUN\tNoun\tCase=Loc|Number=Sing|Person=3\t4\tcompound\t_\t_\n6\tbu\tbu\tDET\tDet\t_\t7\tdet\t_\t_\n7\ty\u0131l\ty\u0131l\tNOUN\tNoun\tCase=Nom|Number=Sing|Person=3\t16\tobl\t_\t_\n8\tseksen\tseksen\tNUM\tANum\tNumType=Card\t10\tnummod\t_\t_\n9\tbin\tbin\tNUM\tANum\tNumType=Card\t8\tflat\t_\t_\n10\totomobil\totomobil\tNOUN\tNoun\tCase=Nom|Number=Sing|Person=3\t16\tnsubj\t_\t_\n11\tve\tve\tCCONJ\tConj\t_\t15\tcc\t_\t_\n12\ttoplam\ttoplam\tNOUN\tNoun\tCase=Nom|Number=Sing|Person=3\t13\tobl\t_\t_\n13\tyuzotuz\tyuzotuz\tNUM\tANum\tNumType=Card\t15\tnummod\t_\t_\n14\tbin\tbin\tNUM\tANum\tNumType=Card\t13\tflat\t_\t_\n15\tara\xE7\tara\xE7\tNOUN\tNoun\tCase=Nom|Number=Sing|Person=3\t10\tconj\t_\t_\n16\tsat\u0131lmas\u0131n\u0131n\tsat\tVERB\tVerb\tAspect=Perf|Case=Gen|Mood=Ind|Number[psor]=Sing|Person[psor]=3|Polarity=Pos|Tense=Pres|VerbForm=Vnoun|Voice=Pass\t17\tnmod:poss\t_\t_\n17\tbeklendi\u011Fini\tbekle\tVERB\tVerb\tAspect=Perf|Case=Acc|Mood=Ind|Number[psor]=Sing|Person[psor]=3|Polarity=Pos|Tense=Past|VerbForm=Part|Voice=Pass\t18\tobj\t_\t_\n18\tkaydederek\tkaydet\tVERB\tVerb\tAspect=Perf|Mood=Ind|Polarity=Pos|Tense=Pres|VerbForm=Conv\t26\tnmod\t_\tSpaceAfter=No\n19\t,\t,\tPUNCT\tPunc\t_\t18\tpunct\t_\t_\n20\t\"\t\"\tPUNCT\tPunc\t_\t24\tpunct\t_\t_\n21\tonalti\tonalti\tNUM\tANum\tNumType=Card\t22\tnummod\t_\t_\n22\ty\u0131l\ty\u0131l\tNOUN\tNoun\tCase=Nom|Number=Sing|Person=3\t23\tnmod\t_\t_\n23\tgeriden\tgeri\tADJ\tNAdj\tCase=Abl|Number=Sing|Person=3\t24\tamod\t_\t_\n24\tgidiyoruz\tgit\tVERB\tVerb\tAspect=Prog|Mood=Ind|Number=Plur|Person=1|Polarity=Pos|Polite=Infm|Tense=Pres\t26\tobj\t_\t_\n25\t\"\t\"\tPUNCT\tPunc\t_\t24\tpunct\t_\t_\n26\tdedi\tde\tVERB\tVerb\tAspect=Perf|Mood=Ind|Number=Sing|Person=3|Polarity=Pos|Tense=Past\t0\troot\t_\tSpaceAfter=No\n27\t.\t.\tPUNCT\tPunc\t_\t26\tpunct\t_\t_",

  labels_1: "# text = \"This is a simple sentence.\"\n# labels = label1 another_label a-third-label\n1\tThis\tThis\t_\t_\t_\t_\t_\t_\t_\n2\tis\tis\t_\t_\t_\t_\t_\t_\t_\n3\ta\ta\t_\t_\t_\t_\t_\t_\t_\n4\tsimple\tsimple\t_\t_\t_\t_\t_\t_\t_\n5\tsentence\tsentence\t_\t_\t_\t_\t_\t_\t_\n6\t.\t.\tPUNCT\tPUNCT\t_\t_\t_\t_\t_",

  labels_2: "# labels = one_label second third-label\n# labels = row_2 again:here this, that\n1\tThis\tThis\t_\t_\t_\t_\t_\t_\t_",

  labels_3: "# tags = this-is-a-tag test testing test\n1\tThis\tThis\t_\t_\t_\t_\t_\t_\t_",

  labels_4: "# labels = new label1 one_label this-is-a-tag\n1\tHullo\thello\t_\t_\t_\t_\t_\t_\t_",

  nested_2: "# text = ab cde f h\n1-2\tab\t_\t_\t_\t_\t_\t_\t_\t_\n1\ta\tA\t_\t_\t_\t_\t_\t_\t_\n2\tb\tB\t_\t_\t_\t_\t_\t_\t_\n3-5\tcde\t_\t_\t_\t_\t_\t_\t_\t_\n3\tc\tC\t_\t_\t_\t_\t_\t_\t_\n4\td\tD\t_\t_\t_\t_\t_\t_\t_\n5\te\tE\t_\t_\t_\t_\t_\t_\t_\n6\tf\tF\t_\t_\t_\t_\t_\t_\t_\n6.1\tsilent_g\tG\t_\t_\t_\t_\t_\t_\t_\n7\th\tH\t_\t_\t_\t_\t_\t_\t_",

  t: "# testing :)\n1-3\tHe\t_\t_\t_\t_\t_\t_\t_\t_\n1\tboued\tboued\tn\t_\tm|sg\t4\tobj\t_\t_\n2\te\te\tvpart\t_\tobj\t4\taux\t_\t_\n3\ttebr\tdebri\xF1\tvblex\t_\tpri|p3|sg\t0\troot\t_\t_\n4\tdoob\tdoobie\tnp\t_\t_\t3\t_\t_\t_\n5\tMona\tMona\tnp\t_\tant|f|sg\t4\tnsubj\t_\t_",

  empty: "1      Sue       Sue       _       _       _       _       _       _       _\n2      likes     like       _       _       _       _       _       _       _\n3      coffee    coffee       _       _       _       _       _       _       _\n4      and       and       _       _       _       _       _       _       _\n5      Bill      Bill       _       _       _       _       _       _       _\n5.1    likes     like       _       _       _       _       _       _       _\n6      tea       tea       _       _       _       _       _       _       _",

  0: "# sent_id = _\n# text = this is a test\n1\tthis\t_\t_\t_\t_\t_\t_\t_\t_\n2\tis\t_\t_\t_\t_\t_\t_\t_\t_\n3\ta\t_\t_\t_\t_\t_\t_\t_\t_\n4\ttest\t_\t_\t_\t_\t_\t_\t_\t_",

  1: "1\tthis\t_\t_\t_\t_\t_\t_\t_\t_\n2\tis\t_\t_\t_\t_\t_\t_\t_\t_\n3\ta\t_\t_\t_\t_\t_\t_\t_\t_\n4\ttest\t_\t_\t_\t_\t_\t_\t_\t_",

  cat_ancora: "# url = https://raw.githubusercontent.com/UniversalDependencies/UD_Catalan-AnCora/dev/ca_ancora-ud-test.conllu\n# sent_id = test-s1\n# text = El darrer n\xFAmero de l'Observatori del Mercat de Treball d'Osona inclou un informe especial sobre la contractaci\xF3 a trav\xE9s de les empreses de treball temporal, les ETT.\n# orig_file_sentence 001#1\n1\tEl\tel\tDET\tDET\tDefinite=Def|Gender=Masc|Number=Sing|PronType=Art\t3\tdet\t_\t_\n2\tdarrer\tdarrer\tADJ\tADJ\tGender=Masc|Number=Sing|NumType=Ord\t3\tamod\t_\t_\n3\tn\xFAmero\tn\xFAmero\tNOUN\tNOUN\tGender=Masc|Number=Sing\t13\tnsubj\t_\t_\n4\tde\tde\tADP\tADP\tAdpType=Prep\t6\tcase\t_\t_\n5\tl'\tel\tDET\tDET\tDefinite=Def|Number=Sing|PronType=Art\t6\tdet\t_\tSpaceAfter=No\n6\tObservatori\tObservatori\tPROPN\tPROPN\t_\t3\tnmod\t_\tMWE=Observatori_del_Mercat_de_Treball_d'_Osona|MWEPOS=PROPN\n7\tdel\tdel\tADP\tADP\tAdpType=Preppron|Gender=Masc|Number=Sing\t8\tcase\t_\t_\n8\tMercat\tMercat\tPROPN\tPROPN\t_\t6\tflat\t_\t_\n9\tde\tde\tADP\tADP\tAdpType=Prep\t10\tcase\t_\t_\n10\tTreball\tTreball\tPROPN\tPROPN\t_\t6\tflat\t_\t_\n11\td'\td'\tADP\tADP\tAdpType=Prep\t12\tcase\t_\tSpaceAfter=No\n12\tOsona\tOsona\tPROPN\tPROPN\t_\t6\tflat\t_\t_\n13\tinclou\tincloure\tVERB\tVERB\tMood=Ind|Number=Sing|Person=3|Tense=Pres|VerbForm=Fin\t0\troot\t_\t_\n14\tun\tun\tNUM\tNUM\tGender=Masc|Number=Sing|NumType=Card\t15\tnummod\t_\t_\n15\tinforme\tinforme\tNOUN\tNOUN\tGender=Masc|Number=Sing\t13\tobj\t_\t_\n16\tespecial\tespecial\tADJ\tADJ\tNumber=Sing\t15\tamod\t_\t_\n17\tsobre\tsobre\tADP\tADP\tAdpType=Prep\t19\tcase\t_\t_\n18\tla\tel\tDET\tDET\tDefinite=Def|Gender=Fem|Number=Sing|PronType=Art\t19\tdet\t_\t_\n19\tcontractaci\xF3\tcontractaci\xF3\tNOUN\tNOUN\tGender=Fem|Number=Sing\t15\tnmod\t_\t_\n20\ta\ta\tADP\tADP\tAdpType=Prep\t24\tcase\t_\tMWE=a_trav\xE9s_de|MWEPOS=ADP\n21\ttrav\xE9s\ttrav\xE9s\tNOUN\tNOUN\t_\t20\tfixed\t_\t_\n22\tde\tde\tADP\tADP\tAdpType=Prep\t20\tfixed\t_\t_\n23\tles\tel\tDET\tDET\tDefinite=Def|Gender=Fem|Number=Plur|PronType=Art\t24\tdet\t_\t_\n24\tempreses\tempresa\tNOUN\tNOUN\tGender=Fem|Number=Plur\t19\tnmod\t_\t_\n25\tde\tde\tADP\tADP\tAdpType=Prep\t26\tcase\t_\t_\n26\ttreball\ttreball\tNOUN\tNOUN\tGender=Masc|Number=Sing\t24\tnmod\t_\t_\n27\ttemporal\ttemporal\tADJ\tADJ\tNumber=Sing\t26\tamod\t_\tSpaceAfter=No\n28\t,\t,\tPUNCT\tPUNCT\tPunctType=Comm\t30\tpunct\t_\t_\n29\tles\tel\tDET\tDET\tDefinite=Def|Gender=Fem|Number=Plur|PronType=Art\t30\tdet\t_\t_\n30\tETT\tETT\tPROPN\tPROPN\t_\t24\tappos\t_\tSpaceAfter=No\n31\t.\t.\tPUNCT\tPUNCT\tPunctType=Peri\t13\tpunct\t_\t_",

  with_tabs: "# sent_id = chapID01:paragID1:sentID1\n# text = \u041A\u0435\u0447\u0430\u0435\u043D\u044C \u0441\u044B\u0440\u0433\u043E\u0437\u0442\u0438\u0437\u044C \u043D\u0430\u043B\u043A\u0441\u0442\u0430\u0432\u0442\u044B\u0446\u044F \u043A\u0430\u0440\u0432\u043E\u0442 .\n# text[eng] = Kechai was awoken by annoying flies.\n1\t\u041A\u0435\u0447\u0430\u0435\u043D\u044C\t\u041A\u0435\u0447\u0430\u0439\tN\tN\tSem/Ant_Mal|Prop|SP|Gen|Indef\t2\tobj\t_\t\u041A\u0435\u0447\u0430\u0435\u043D\u044C\n2\t\u0441\u044B\u0440\u0433\u043E\u0437\u0442\u0438\u0437\u044C\t\u0441\u044B\u0440\u0433\u043E\u0437\u0442\u0435\u043C\u0441\tV\tV\tTV|Ind|Prt1|ScPl3|OcSg3\t0\troot\t_\t\u0441\u044B\u0440\u0433\u043E\u0437\u0442\u0438\u0437\u044C\n3\t\u043D\u0430\u043B\u043A\u0441\u0442\u0430\u0432\u0442\u044B\u0446\u044F\t\u043D\u0430\u043B\u043A\u0441\u0442\u0430\u0432\u0442\u043E\u043C\u0441\tPRC\tPrc\tV|TV|PrcPrsL|Sg|Nom|Indef\t4\tamod\t_\t\u043D\u0430\u043B\u043A\u0441\u0442\u0430\u0432\u0442\u044B\u0446\u044F\n4\t\u043A\u0430\u0440\u0432\u043E\u0442\t\u043A\u0430\u0440\u0432\u043E\tN\tN\tSem/Ani|N|Pl|Nom|Indef\t2\tnsubj\t_\t\u043A\u0430\u0440\u0432\u043E\u0442\n5\t.\t.\tCLB\tCLB\tCLB\t2\tpunct\t_\t.",

  without_tabs: "# sent_id = chapID01:paragID1:sentID1\n# text = \u041A\u0435\u0447\u0430\u0435\u043D\u044C \u0441\u044B\u0440\u0433\u043E\u0437\u0442\u0438\u0437\u044C \u043D\u0430\u043B\u043A\u0441\u0442\u0430\u0432\u0442\u044B\u0446\u044F \u043A\u0430\u0440\u0432\u043E\u0442 .\n# text[eng] = Kechai was awoken by annoying flies.\n1 \u041A\u0435\u0447\u0430\u0435\u043D\u044C \u041A\u0435\u0447\u0430\u0439 N N Sem/Ant_Mal|Prop|SP|Gen|Indef 2 obj _ \u041A\u0435\u0447\u0430\u0435\u043D\u044C\n2 \u0441\u044B\u0440\u0433\u043E\u0437\u0442\u0438\u0437\u044C \u0441\u044B\u0440\u0433\u043E\u0437\u0442\u0435\u043C\u0441 V V TV|Ind|Prt1|ScPl3|OcSg3 0 root _ \u0441\u044B\u0440\u0433\u043E\u0437\u0442\u0438\u0437\u044C\n3 \u043D\u0430\u043B\u043A\u0441\u0442\u0430\u0432\u0442\u044B\u0446\u044F \u043D\u0430\u043B\u043A\u0441\u0442\u0430\u0432\u0442\u043E\u043C\u0441 PRC Prc V|TV|PrcPrsL|Sg|Nom|Indef 4 amod _ \u043D\u0430\u043B\u043A\u0441\u0442\u0430\u0432\u0442\u044B\u0446\u044F\n4 \u043A\u0430\u0440\u0432\u043E\u0442 \u043A\u0430\u0440\u0432\u043E N N Sem/Ani|N|Pl|Nom|Indef 2 nsubj _ \u043A\u0430\u0440\u0432\u043E\u0442\n5 . . CLB CLB CLB 2 punct _ .",

  from_cg3_with_semicolumn: "1\tSiedzieli\u015Bmy\tsiedzie\u0107\tvblex\t_\timpf|past|p1|m|pl\t_\t_\t_\t_\n2\tw\tw\tpr\t_\t_\t_\t_\t_\t_\n3\tmoim\tm\xF3j\tprn\t_\tpos|mi|sg|loc\t_\t_\t_\t_\n4\tpokoju\tpok\xF3j\tn\t_\tmi|sg|loc\t_\t_\t_\t_\n5\t,\t,\tcm\t_\t_\t_\t_\t_\t_\n6\tpal\u0105c\tpali\u0107\tvblex\t_\timpf|pprs|adv\t_\t_\t_\t_\n7\ti\ti\tcnjcoo\t_\t_\t_\t_\t_\t_\n8\trozmawiaj\u0105c\trozmawia\u0107\tvblex\t_\timpf|pprs|adv\t_\t_\t_\t_\n9\to\to\tpr\t_\t_\t_\t_\t_\t_\n10\ttem\tto\tprn\t_\tdem|mi|sg|loc\t_\t_\t_\t_\n11\t,\t,\tcm\t_\t_\t_\t_\t_\t_\n12\tjak\tjak\trel\t_\tadv\t_\t_\t_\t_\n13\tmarni\tmarny\tadj\t_\tsint|mp|pl|nom\t_\t_\t_\t_\n14\tjeste\u015Bmy\tby\u0107\tvbser\t_\tpres|p1|pl\t_\t_\t_\t_\n15\t,\t,\tcm\t_\t_\t_\t_\t_\t_\n16\tmarni\tmarny\tadj\t_\tsint|mp|pl|nom\t_\t_\t_\t_\n17\tz\tz\tpr\t_\t_\t_\t_\t_\t_\n18\tlekarskiego\tlekarski\tadj\t_\tmi|sg|gen\t_\t_\t_\t_\n19\tpunktu\tpunkt\tn\t_\tmi|sg|gen\t_\t_\t_\t_\n20\twidzenia\twidzie\u0107\tvblex\t_\timpf|ger|nt|sg|gen\t_\t_\t_\t_\n21\tchc\u0119\tchcie\u0107\tvblex\t_\timpf|pres|p1|sg\t_\t_\t_\t_\n22\tpowiedzie\u0107\tpowiedzie\u0107\tvblex\t_\tperf|inf\t_\t_\t_\t_\n23\t,\t,\tcm\t_\t_\t_\t_\t_\t_\n24\tnaturalnie\tnaturalnie\tadv\t_\tsint\t_\t_\t_\t_\n25\t.\t.\tsent\t_\t_\t_\t_\t_\t_",

  from_cg3_simple: "1\t\u041F\u0430\u0442\u0448\u0430\u043C\u0435\u043D\t\u043F\u0430\u0442\u0448\u0430\tn\t_\tins\t3\tnmod\t_\t_\n2\t\u0441\u043E\u0493\u044B\u0441\t\u0441\u043E\u0493\u044B\u0441\tn\t_\tnom\t3\tobj\t_\t_\n3\t\u0430\u0448\u049B\u0430\u043D\u0434\u0430\t\u0430\u0448\tv\t_\ttv|ger_past|loc\t12\tadvcl\t_\t_\n4\t,\t,\tcm\t_\t_\t12\tpunct\t_\t_\n5\t\u0435\u043B-\u0436\u04B1\u0440\u0442\t\u0435\u043B-\u0436\u04B1\u0440\u0442\tn\t_\tnom\t7\tconj\t_\t_\n6\t,\t,\tcm\t_\t_\t7\tpunct\t_\t_\n7\t\u043E\u0442\u0430\u043D\u044B\u043C\u0434\u044B\t\u043E\u0442\u0430\u043D\tn\t_\tpx1sg|acc\t8\tobj\t_\t_\n8\t\u049B\u043E\u0440\u0493\u0430\u0443\u0493\u0430\t\u049B\u043E\u0440\u0493\u0430\tv\t_\ttv|ger|dat\t12\tadvcl\t_\t_\n9\t,\t,\tcm\t_\t_\t12\tpunct\t_\t_\n10\t\u0431\u0456\u0437\t\u0431\u0456\u0437\tprn\t_\tpers|p1|pl|nom\t12\tnsubj\t_\t_\n11\t\u0441\u043E\u0493\u044B\u0441\u049B\u0430\t\u0441\u043E\u0493\u044B\u0441\tn\t_\tdat\t12\tnmod\t_\t_\n12\t\u0431\u0430\u0440\u0434\u044B\u049B\t\u0431\u0430\u0440\tv\t_\tiv|ifi|p1|pl\t0\troot\t_\t_\n13\t.\t.\tsent\t_\t_\t12\tpunct\t_\t_\n",

  from_cg3_with_spans: "# text = He boued e tebr Mona er gegin.\n# text[eng] = Mona eats her food here in the kitchen.\n# labels = press_1986 ch_syntax p_197 to_check\n1\tHe\the\tdet\t_\tpos|f|sp\t2\tdet\t_\t_\n2\tboued\tboued\tn\t_\tm|sg\t4\tobj\t_\t_\n3\te\te\tvpart\t_\tobj\t4\taux\t_\t_\n4\ttebr\tdebri\xF1\tvblex\t_\tpri|p3|sg\t0\troot\t_\t_\n5\tMona\tMona\tnp\t_\tant|f|sg\t4\tnsubj\t_\t_\n6-7\ter\t_\t_\t_\t_\t_\t_\t_\t_\n6\t_\te\tpr\t_\t_\t8\tcase\t_\t_\n7\t_\tan\tdet\t_\tdef|sp\t8\tdet\t_\t_\n8\tgegin\tkegin\tn\t_\tf|sg\t4\tobl\t_\t_\n9\t.\t.\tsent\t_\t_\t4\tpunct\t_\t_\n",

  rueter_long: "# sent_id = BryzhinskijMixail_Kirdazht_manu:3859\n# text = \u041D\u043E \u0437\u044F\u0440\u0441 \u0432\u0430\u043B\u0433\u0441\u044C , \u0437\u044F\u0440\u0441 \u043F\u0430\u043D\u0436\u0442\u043D\u0435\u0441\u044C \u0434\u044B \u043C\u0435\u043A\u0435\u0432 \u043F\u0430\u0440\u0441\u0442\u0435 \u043F\u0435\u043A\u0441\u0442\u043D\u0435\u0441\u044C \u0432\u0435\u043B\u0435 \u043A\u0435\u043D\u043A\u0448\u0435\u043D\u0442\u044C , \u043A\u0443\u0436\u043E \u043A\u0435\u043D\u043A\u0448\u0435\u043D\u0442\u044C , \u043A\u0443\u0440\u043E \u043A\u0435\u043D\u043A\u0448\u0435\u043D\u0442\u044C \u0434\u044B \u044D\u0441\u0435\u0441\u0442 \u044E\u0440\u0442\u0441 \u0441\u043E\u0432\u0430\u043C\u043E \u043A\u0435\u043D\u043A\u0448\u0435\u043D\u0442\u044C \u044D\u0440\u044C\u0432\u0430 \u043B\u0438\u0441\u0438\u0446\u044F\u043D\u0442\u0435\u043D\u044C \u0441\u043E\u0432\u0438\u0446\u044F\u043D\u0442\u0435\u043D\u044C \u0442\u0435 \u0441\u0432\u0430\u043B \u0442\u0435\u0439\u043D\u0435\u043C\u0430 , \u043A\u0435\u043D\u043A\u0448\u0442\u043D\u0435 \u0441\u0432\u0430\u043B \u043F\u0435\u043A\u0441\u0442\u0430\u0437\u044C \u0443\u043B\u0435\u0437\u0442 ; \u043F\u0430\u043D\u0436\u0442\u043D\u0435\u0441\u044B\u0437\u044C \u043A\u0435\u043B\u0435\u0441 \u0430\u043D\u0441\u044F\u043A \u0432\u0430\u043B\u0441\u043A\u0435 \u043C\u0430\u0440\u0442\u043E \u0434\u044B \u0447\u043E\u043F\u043E\u043D\u044C\u0431\u0435\u043B\u0435\u0432 \u2014 \u0440\u0430\u043A\u0448\u0430\u043D\u044C \u043B\u0438\u0432\u0442\u0435\u043C\u0430 \u0441\u043E\u0432\u0430\u0432\u0442\u043E\u043C\u0430 \u0448\u043A\u0430\u043D\u0435 , \u043A\u0443\u0439\u043C\u0435\u0441\u044C \u0442\u0430\u0433\u043E \u0441\u0442\u0430\u043A\u0430\u043B\u0433\u0430\u0434\u0441\u044C .\n# text_en = But by the time he got down the hill, opened and closed the village gate, the lane gate, the cluster gate and the one to their own home (something everyone coming or going had to do, so the gates would always be closed; they were only opened in the morning and at dusk for taking out and letting in the cattle), the wicker of clay had grown heavy again.\n# text_fi = Kun Ket\u0161ai tuli m\xE4elt\xE4 alas, avasi ja sulki huolellisesti kyl\xE4ver\xE4j\xE4ns\xE4, ??aukio/kentt\xE4ver\xE4j\xE4n, kujaver\xE4j\xE4n ja oman kotiver\xE4j\xE4n, savikontti ehti taas alkaa painaa h\xE4nen selk\xE4\xE4ns\xE4. (Kaikkien k\xE4vij\xF6iden tulee tehd\xE4 n\xE4in, jotta ver\xE4j\xE4t olisivat aina kiinni, ver\xE4j\xE4th\xE4n pidet\xE4\xE4n selkosen sel\xE4ll\xE4\xE4n vain aamulla ja illansuussa, kun karjaa ajetaan laitumelle tai kotiin.)\n1 \u041D\u043E \u043D\u043E CCONJ CC _ 3 cc _ _\n2 \u0437\u044F\u0440\u0441 \u0437\u044F\u0440\u0441 ADV Adv|Der/Ill|Adv|Sem/Time Derivation=Ill|AdvType=Tim 3 mark _ _\n3 \u0432\u0430\u043B\u0433\u0441\u044C \u0432\u0430\u043B\u0433\u043E\u043C\u0441 VERB V|Ind|Prt1|ScSg3 Mood=Ind|Number[subj]=Sing|Person[subj]=3|Tense=Prt1 51 advcl _ SpaceAfter=No\n4 , , PUNCT CLB _ 6 punct _ _\n5 \u0437\u044F\u0440\u0441 \u0437\u044F\u0440\u0441 ADV Adv|Der/Ill|Adv|Sem/Time Derivation=Ill|AdvType=Tim 6 mark _ _\n6 \u043F\u0430\u043D\u0436\u0442\u043D\u0435\u0441\u044C \u043F\u0430\u043D\u0436\u0442\u043D\u0435\u043C\u0441 VERB V|Ind|Prt1|ScSg3 Mood=Ind|Number[subj]=Sing|Person[subj]=3|Tense=Prt1 3 conj _ _\n7 \u0434\u044B \u0434\u044B CCONJ CC _ 10 cc _ _\n8 \u043C\u0435\u043A\u0435\u0432 \u043C\u0435\u043A\u0435\u0432 ADV Adv|Lat|Sg|Nom|Indef Case=Lat|Case=Nom|Definite=Ind|Number=Sing 10 advmod _ _\n9 \u043F\u0430\u0440\u0441\u0442\u0435 \u043F\u0430\u0440\u0441\u0442\u0435 ADV Adv|Manner AdvType=Man 10 advmod _ _\n10 \u043F\u0435\u043A\u0441\u0442\u043D\u0435\u0441\u044C \u043F\u0435\u043A\u0441\u0442\u043D\u0435\u043C\u0441 VERB V|Ind|Prt1|ScSg3 Mood=Ind|Number[subj]=Sing|Person[subj]=3|Tense=Prt1 3 conj _ _\n11 \u0432\u0435\u043B\u0435 \u0432\u0435\u043B\u0435 NOUN N|Sem/Inanim_Cnt|Sg|Nom|Indef Case=Nom|Definite=Ind|Number=Sing 10 obj _ _\n12 \u043A\u0435\u043D\u043A\u0448\u0435\u043D\u0442\u044C \u043A\u0435\u043D\u043A\u0448 NOUN N|Sem/Inanim_Cnt|Sg|Gen|Def Case=Gen|Definite=Def|Number=Sing 11 goeswith _ SpaceAfter=No\n13 , , PUNCT CLB _ 15 punct _ _\n14 \u043A\u0443\u0436\u043E \u043A\u0443\u0436\u043E NOUN N|Sem/Inanim_Cnt|Sg|Nom|Indef Case=Nom|Definite=Ind|Number=Sing 12 conj _ _\n15 \u043A\u0435\u043D\u043A\u0448\u0435\u043D\u0442\u044C \u043A\u0435\u043D\u043A\u0448 NOUN N|Sem/Inanim_Cnt|Sg|Gen|Def Case=Gen|Definite=Def|Number=Sing 14 goeswith _ SpaceAfter=No\n16 , , PUNCT CLB _ 18 punct _ _\n17 \u043A\u0443\u0440\u043E \u043A\u0443\u0440\u043E NOUN N|Sem/Inanim_Cnt|Sg|Nom|Indef Case=Nom|Definite=Ind|Number=Sing 12 conj _ _\n18 \u043A\u0435\u043D\u043A\u0448\u0435\u043D\u0442\u044C \u043A\u0435\u043D\u043A\u0448 NOUN N|Sem/Inanim_Cnt|Sg|Gen|Def Case=Gen|Definite=Def|Number=Sing 17 goeswith _ _\n19 \u0434\u044B \u0434\u044B CCONJ CC _ 23 cc _ _\n20 \u044D\u0441\u0435\u0441\u0442 \u044D\u0441\u044C PRON Pron|Refl|Pl3|Gen|Variant=Short Case=Gen|Number=Plur|Person=3|PronType=Refl|Variant=Short 22 nmod _ _\n21 \u044E\u0440\u0442\u0441 \u044E\u0440\u0442 NOUN N|Sem/Inanim_Cnt|SP|Ill|Indef Case=Ill|Definite=Ind|Number=Plur,Sing 20 case _ _\n22 \u0441\u043E\u0432\u0430\u043C\u043E \u0441\u043E\u0432\u0430\u043C\u043E NOUN N|IV|Sg|Nom|Indef Case=Nom|Definite=Ind|Number=Sing|Valency=1 23 compound _ _\n23 \u043A\u0435\u043D\u043A\u0448\u0435\u043D\u0442\u044C \u043A\u0435\u043D\u043A\u0448 NOUN N|Sem/Inanim_Cnt|Sg|Gen|Def Case=Gen|Definite=Def|Number=Sing 12 conj _ _\n24 ( ( PUNCT PUNCT _ 29 punct _ SpaceAfter=No\n25 \u044D\u0440\u044C\u0432\u0430 \u044D\u0440\u044C\u0432\u0430 DET Det|Sg|Nom|Indef Case=Nom|Definite=Ind|Number=Sing 26 det _ _\n26 \u043B\u0438\u0441\u0438\u0446\u044F\u043D\u0442\u0435\u043D\u044C-\u0441\u043E\u0432\u0438\u0446\u044F\u043D\u0442\u0435\u043D\u044C \u043B\u0438\u0441\u0438\u0446\u044F\u0442-\u0441\u043E\u0432\u0438\u0446\u044F\u0442 NOUN N|V|NomAg|Sg|Dat|Def Case=Dat|Definite=Def|Derivation=NomAg|Number=Sing 29 obl _ _\n27 \u0442\u0435 \u0442\u0435 PRON Pron|Dem|Sg|Nom|Indef Case=Nom|Definite=Ind|Number=Sing|PronType=Dem 29 nsubj _ _\n28 \u0441\u0432\u0430\u043B \u0441\u0432\u0430\u043B ADV Adv|Tot|Sem/Time_dur PronType=Tot|PronType=Tot 29 advmod _ _\n29 \u0442\u0435\u0439\u043D\u0435\u043C\u0430 \u0442\u0435\u0439\u043D\u0435\u043Cc VERB V|TV|Oblig|Clitic=Cop|Prs|ScSg3 Valency=2|VerbForm=Oblig|Clitic=Cop|Number[subj]=Sing|Person[subj]=3|Tense=Pres 3 parataxis _ SpaceAfter=No\n30 , , PUNCT CLB _ 33 punct _ _\n31 \u043A\u0435\u043D\u043A\u0448\u0442\u043D\u0435 \u043A\u0435\u043D\u043A\u0448 NOUN N|Sem/Inanim_Cnt|Pl|Nom|Def Case=Nom|Definite=Def|Number=Plur 34 nsubj _ _\n32 \u0441\u0432\u0430\u043B \u0441\u0432\u0430\u043B ADV Adv|Tot|Sem/Time_dur PronType=Tot|PronType=Tot 33 advmod _ _\n33 \u043F\u0435\u043A\u0441\u0442\u0430\u0437\u044C \u043F\u0435\u043A\u0441\u0442\u0430\u043C\u0441 VERB V|Der/\u041E\u0437\u044C|Ger Derivation=Ozj|VerbForm=Conv 29 ccomp _ _\n34 \u0443\u043B\u0435\u0437\u0442 \u0443\u043B\u0435\u043C\u0441 AUX V|IV|Opt|ScPl3 Mood=Opt|Number[subj]=Plur|Person[subj]=3|Valency=1 33 cop _ SpaceAfter=No\n35 ; ; PUNCT CLB _ 29 punct _ _\n36 \u043F\u0430\u043D\u0436\u0442\u043D\u0435\u0441\u044B\u0437\u044C \u043F\u0430\u043D\u0436\u0442\u043D\u0435\u043C\u0441 VERB V|Ind|Prs|ScPl3|Obj3 Mood=Ind|Number[subj]=Plur|Person[subj]=3|Tense=Pres|Obj3 29 conj _ _\n37 \u043A\u0435\u043B\u0435\u0441 \u043A\u0435\u043B\u0435\u0441 ADV Adv Adv 36 advmod _ _\n38 \u0430\u043D\u0441\u044F\u043A \u0430\u043D\u0441\u044F\u043A ADV Adv Adv 39 advmod _ _\n39 \u0432\u0430\u043B\u0441\u043A\u0435 \u0432\u0430\u043B\u0441\u043A\u0435 NOUN N|Sg|Nom|Indef Case=Nom|Definite=Ind|Number=Sing 36 obl _ _\n40 \u043C\u0430\u0440\u0442\u043E \u043C\u0430\u0440\u0442\u043E ADP Adp|Po AdpType=Post 39 case _ _\n41 \u0434\u044B \u0434\u044B CCONJ CC _ 42 cc _ _\n42 \u0447\u043E\u043F\u043E\u043D\u044C\u0431\u0435\u043B\u0435\u0432 \u0447\u043E\u043F\u043E\u043D\u044C\u0431\u0435\u043B\u0435\u0432 ADV Adv|Lat Case=Lat 39 conj _ _\n43 \u2014 \u2014 PUNCT CLB _ 46 punct _ _\n44 \u0440\u0430\u043A\u0448\u0430\u043D\u044C \u0440\u0430\u043A\u0448\u0430 NOUN N|Sem/Anim_Cnt|SP|Gen|Indef Case=Gen|Definite=Ind|Number=Plur,Sing 45 nmod:gobj _ _\n45 \u043B\u0438\u0432\u0442\u0435\u043C\u0430-\u0441\u043E\u0432\u0430\u0432\u0442\u043E\u043C\u0430 \u043B\u0438\u0432\u0442\u0435\u043C\u0430-\u0441\u043E\u0432\u0430\u0432\u0442\u043E\u043C\u0430 NOUN N|Sg|Nom|Indef Case=Nom|Definite=Ind|Number=Sing 36 nmod _ _\n46 \u0448\u043A\u0430\u043D\u0435 \u0448\u043A\u0430 NOUN N|Sem/Time|SP|Temp|Indef Case=Temp|Definite=Ind|Number=Plur,Sing 39 conj _ SpaceAfter=No\n47 ) ) PUNCT PUNCT _ 29 punct _ SpaceAfter=No\n48 , , PUNCT CLB _ 29 punct _ _\n49 \u043A\u0443\u0439\u043C\u0435\u0441\u044C \u043A\u0443\u0439\u043C\u0435 NOUN N|Sem/Inanim_Cnt|Sg|Nom|Def Case=Nom|Definite=Def|Number=Sing 51 nsubj _ _\n50 \u0442\u0430\u0433\u043E \u0442\u0430\u0433\u043E ADV Adv|Sem/Time AdvType=Tim 51 advmod _ _\n51 \u0441\u0442\u0430\u043A\u0430\u043B\u0433\u0430\u0434\u0441\u044C \u0441\u0442\u0430\u043A\u0430\u043B\u0433\u0430\u0434\u043E\u043C\u0441 VERB V|Ind|Prt1|ScSg3 Mood=Ind|Number[subj]=Sing|Person[subj]=3|Tense=Prt1 0 root _ SpaceAfter=No\n52 . . PUNCT CLB _ 51 punct _ _",

  katya_aplonova_large_arrows: "# sent_id = html/meyer_gorog-contes_bambara_10amadu_tara.dis.html:16\n# text = ko ni i sera ka jiri nin bulu s\xF2r\xF2 ka na ni a ye, ko c\xE8k\xF2r\xF2ba b\xE8 se ka furak\xE8 o la.\n1\tko\tk\xF3\tPART\tcop\t_\t4\tdiscourse\t_\tGloss=QUOT\n2\tni\tn\xED\tSCONJ\tconj\t_\t4\tmark\t_\tGloss=si\n3\ti\t\xED\tPRON\tpers\tPronType=Prs\t4\tnsubj\t_\tGloss=2.SG\n4\tsera\tsera\tVERB\tv\tAspect=Perf|Valency=1|Polarity=Pos\t19\tadvcl\t_\tGloss=arriver|Morf=arriver,PFV.INTR\n5\tka\tk\xE0\tAUX\tpm\t_\t9\taux\t_\tGloss=INF\n6\tjiri\tj\xEDri\tNOUN\tn\t_\t8\tnmod:poss\t_\tGloss=arbre\n7\tnin\tn\xECn\tDET\tprn/dtm\tPronType=Dem|Definite-Def\t6\tdet\t_\tGloss=DEM\n8\tbulu\tb\xFAlu\tNOUN\tn\t_\t9\tobj\t_\tGloss=feuille\n9\ts\xF2r\xF2\ts\u0254\u0300r\u0254\tVERB\tv\t_\t4\txcomp\t_\tGloss=obtenir\n10\tka\tk\xE0\tAUX\tpm\t_\t11\taux\t_\tGloss=INF\n11\tna\tn\xE0\tVERB\tv\t_\t9\txcomp\t_\tGloss=venir\n12\tni\tn\xED\tADP\tconj/prep\t_\t13\tcase\t_\tGloss=et\n13\ta\t\xE0\tPRON\tpers\tPronType=Prs|Number=Sing|Person=3\t11\tobl\t_\tGloss=3SG\n14\tye\ty\xE9\tADP\tpp\t_\t13\tcase\t_\tGloss=PP\n15\t,\t,\tPUNCT\t_\t_\t4\tpunct\t_\tGloss=,\n16\tko\tk\xF3\tPART\tcop\t_\t19\tdiscourse\t_\tGloss=QUOT\n17\tc\xE8k\xF2r\xF2ba\tc\u025B\u0300.k\u0254r\u0254.ba\tNOUN\tn\t_\t19\tnsubj\t_\tGloss=vieillard|Morf=vieillard,m\xE2le,vieux,AUGM\n18\tb\xE8\tb\u025B\u0301\tAUX\tpm\tPolarity=Pos|Aspect=Imp\t19\taux\t_\tGloss=IPFV.AFF\n19\tse\ts\xE9\tVERB\tv\t_\t0\troot\t_\tGloss=arriver\n20\tka\tk\xE0\tAUX\tpm\t_\t21\taux\t_\tGloss=INF\n21\tfurak\xE8\tf\xFAra.k\u025B\tVERB\tv\t_\t19\txcomp\t_\tGloss=soigner|Morf=soigner,feuille,faire\n22\to\t\xF2\tPRON\tprn\t_\t21\tobl\t_\tGloss=ce\n23\tla\tl\xE1\tADP\tpp\t_\t22\tcase\t_\tGloss=dans\n24\t.\t.\tPUNCT\t_\t_\t19\tpunct\t_\tGloss=.\n",

  katya_aplonova_long: "# sent_id = html/meyer_gorog-contes_bambara_10amadu_tara.dis.html:19\n# text = ko u ye m\xF2g\xF2 nyini a ye, min b\xE8 a furak\xE8 sisan ko c\xE8 ye furak\xE8li cogoya b\xE8\xE8 f\xF2, ko fura nin s\xF2r\xF2 ka g\xE8l\xE8n ko epi ko ni o ye a s\xF2r\xF2 u ye ale den de ye, ni min b\xE8 sa de furanyini f\xE8 a ka sa nin min b\xE8 balo o ka balo ko u k\xF2n\xF2nt\xF2 b\xE8\xE8 ka taga fura nin nyini, ko u k\xF2n\xF2nt\xF2 b\xE8\xE8 ka taga ko nin min seginna ka a s\xF2r\xF2 fura ma na, ko a b\xE8 o den nin haramuya ka o g\xE8n, ka a b\xE8 a ba fana g\xE8n ko u ka a fil\xE8 u y\xE8r\xE8 ni min ma s\xF2n fana ko a b\xE8 o g\xE8n, o ni a ba b\xE8\xE8.\n# label = too_long_to_cut\n1\tko\tk\xF3\tPART\tcop\t_\t5\tdiscourse\t_\tGloss=QUOT\n2\tu\t\xF9\tPRON\tpers\tPronType=Prs|Number=Plur|Person=3\t5\tnsubj\t_\tGloss=3PL\n3\tye\ty\xE9\tAUX\tpm\tAspect=Perf|Valency=2|Polarity=Pos\t5\taux\t_\tGloss=PFV.TR\n4\tm\xF2g\xF2\tm\u0254\u0300g\u0254\tNOUN\tn\t_\t5\tobj\t_\tGloss=homme\n5\tnyini\t\u0272\xEDni\tVERB\tv\t_\t0\troot\t_\tGloss=chercher\n6\ta\t\xE0\tPRON\tpers\tPronType=Prs|Number=Sing|Person=3\t5\tobl\t_\tGloss=3SG\n7\tye\ty\xE9\tADP\tpp\t_\t6\tcase\t_\tGloss=PP\n8\t,\t,\tPUNCT\t_\t_\t5\tpunct\t_\tGloss=,\n9\tmin\tm\xEDn\tPRON\tprn\tPronType=Rel\t_\t_\t_\tGloss=REL\n10\tb\xE8\tb\u025B\u0301\tAUX\tpm\tPolarity=Pos|Aspect=Imp\t_\t_\t_\tGloss=IPFV.AFF\n11\ta\t\xE0\tPRON\tpers\tPronType=Prs|Number=Sing|Person=3\t_\t_\t_\tGloss=3SG\n12\tfurak\xE8\tf\xFAra.k\u025B\tVERB\tv\t_\t_\t_\t_\tGloss=soigner|Morf=soigner,feuille,faire\n13\tsisan\ts\xEDsan\tADV\tadv/n\t_\t_\t_\t_\tGloss=maintenant\n14\tko\tk\xF3\tPART\tcop\t_\t_\t_\t_\tGloss=QUOT\n15\tc\xE8\tc\u025B\u0300\tNOUN\tn\t_\t_\t_\t_\tGloss=m\xE2le\n16\tye\tye\tAUX\tpm\tAspect=Perf|Valency=2|Polarity=Pos\t_\t_\t_\tGloss=PFV.TR\n17\tfurak\xE8li\tf\xFArak\u025Bli\tNOUN\tn\tVerbalForm=Vnoun\t_\t_\t_\tGloss=traitement|Morf=traitement,feuille,faire,NMLZ\n18\tcogoya\tc\xF3goya\tNOUN\tn\t_\t_\t_\t_\tGloss=mani\xE8re|Morf=mani\xE8re,mani\xE8re,ABSTR\n19\tb\xE8\xE8\tb\u025B\u0301\u025B\tDET\tdtm\t_\t_\t_\t_\tGloss=tout\n20\tf\xF2\tf\u0254\u0301\tVERB\tv\t_\t_\t_\t_\tGloss=dire\n21\t,\t,\tPUNCT\t_\t_\t_\t_\t_\tGloss=,\n22\tko\tk\xF3\tPART\tcop\t_\t27\tdiscourse\t_\tGloss=QUOT\n23\tfura\tf\xFAra\tNOUN\tn\t_\t25\tnmod:poss\t_\tGloss=feuille\n24\tnin\tn\xECn\tDET\tdtm\tPronType=Dem|Definite-Def\t23\tdet\t_\tGloss=DEM\n25\ts\xF2r\xF2\ts\u0254\u0300r\u0254\tNOUN\tv\t_\t27\tnsubj\t_\tGloss=obtenir\n26\tka\tka\tAUX\tpm\tPolarity=Pos\t27\taux\t_\tGloss=QUAL.AFF\n27\tg\xE8l\xE8n\tg\u025B\u0300l\u025Bn\tVERB\tvq\t_\t_\t_\t_\tGloss=dur\n28\tko\tk\xF3\tPART\tcop\t_\t29\tdiscourse\t_\tGloss=QUOT\n29\tepi\tepi\tCCONJ\tconj\t_\t27\tcc\t_\tGloss=ETRG.FRA\n30\tko\tk\xF3\tVERB\tcop\t_\t37\tdiscourse\t_\tGloss=QUOT\n31\tni\tn\xED\tSCONJ\tconj\t_\t35\tmark\t_\tGloss=si\n32\to\t\xF2\tPRON\tprn\t_\t35\tnsubj\t_\tGloss=ce\n33\tye\tye\tAUX\tpm\tAspect=Perf|Valency=2|Polarity=Pos\t35\taux\t_\tGloss=PFV.TR\n34\ta\t\xE0\tPRON\tpers\tPronType=Prs|Number=Sing|Person=3\t35\tobj\t_\tGloss=3SG\n35\ts\xF2r\xF2\ts\u0254\u0300r\u0254\tVERB\tv\t_\t37\tadvcl\t_\tGloss=obtenir\n36\tu\t\xF9\tPRON\tpers\tPronType=Prs|Number=Plur|Person=3\t37\tnsubj\t_\tGloss=3PL\n37\tye\ty\xE9\tVERB\tcop\tPolarity=Pos\t27\tparataxis\t_\tGloss=EQU\n38\tale\t\xE0l\xEA\tPRON\tpers\tPronType=Prs|Number=Sing|Person=3|PronType=Emp\t39\tnmod:poss\t_\tGloss=3SG.EMPH\n39\tden\td\xE9n\tNOUN\tn\t_\t37\tobl\t_\tGloss=enfant\n40\tde\td\xE8\tPART\tprt\t_\t39\tdiscourse\t_\tGloss=FOC\n41\tye\ty\xE9\tADP\tpp\t_\t39\tcase\t_\tGloss=PP\n42\t,\t,\tPUNCT\t_\t_\t37\tpunct\t_\tGloss=,\n43\tni\tn\xED\tSCONJ\tconj\t_\t46\tmark\t_\tGloss=si\n44\tmin\tm\xEEn\tPRON\tprn\tPronType=Rel\t46\t_\t_\tGloss=REL\n45\tb\xE8\tb\u025B\tAUX\tpm\tPolarity=Pos|Aspect=Imp\t46\t_\t_\tGloss=IPFV.AFF\n46\tsa\ts\xE0\tVERB\tv\t_\t52\t_\t_\tGloss=mourir\n47\tde\td\xE8\tPART\tprt\t_\t46\t_\t_\tGloss=FOC\n48\tfuranyini\tfura\u0272ini\tNOUN\tn\t_\t46\t_\t_\tGloss=feuille|Morf=feuille,chercher\n49\tf\xE8\tf\u025B\u0300\tADP\tpp\t_\t48\t_\t_\tGloss=par\n50\ta\t\xE0\tPRON\tpers\tPronType=Prs|Number=Sing|Person=3\t52\t_\t_\tGloss=3SG\n51\tka\tka\tAUX\tpm\tMood=Subj|Polarity=Aff\t52\t_\t_\tGloss=SBJV\n52\tsa\ts\xE0\tVERB\tv\t_\t37\t_\t_\tGloss=mourir\n53\tnin\tn\xED\tSCONJ\tconj\t_\t56\tmark\t_\tGloss=quand\n54\tmin\tm\xEEn\tPRON\tprn\tPronType=Rel\t56\t_\t_\tGloss=REL\n55\tb\xE8\tb\u025B\tAUX\tpm\tPolarity=Pos|Aspect=Imp\t56\t_\t_\tGloss=IPFV.AFF\n56\tbalo\tb\xE1lo\tVERB\tv\t_\t59\t_\t_\tGloss=vivre\n57\to\t\xF2\tPRON\tprn\t_\t59\t_\t_\tGloss=ce\n58\tka\tka\tAUX\tpm\tMood=Subj|Polarity=Aff\t59\t_\t_\tGloss=SBJV\n59\tbalo\tb\xE1lo\tVERB\tv\t_\t52\t_\t_\tGloss=vivre\n60\tko\tk\xF3\tPART\tcop\t_\t_\t_\t_\tGloss=QUOT\n61\tu\t\xF9\tPRON\tpers\tPronType=Prs|Number=Plur|Person=3\t_\t_\t_\tGloss=3PL\n62\tk\xF2n\xF2nt\xF2\tk\u0254\u0300n\u0254nt\u0254n\tNUM\tnum\t_\t_\t_\t_\tGloss=neuf\n63\tb\xE8\xE8\tb\u025B\u0301\u025B\tDET\tdtm\t_\t_\t_\t_\tGloss=tout\n64\tka\tka\tAUX\tpm\tMood=Subj|Polarity=Aff\t_\t_\t_\tGloss=SBJV\n65\ttaga\tt\xE1ga\tVERB\tv\t_\t59\t_\t_\tGloss=aller\n66\tfura\tf\xFAra\tNOUN\tn\t_\t_\t_\t_\tGloss=feuille\n67\tnin\tn\xECn\tDET\tdtm\tPronType=Dem|Definite-Def\t_\t_\t_\tGloss=DEM\n68\tnyini\t\u0272\xEDni\tVERB\tv\t_\t_\t_\t_\tGloss=chercher\n69\t,\t,\tPUNCT\t_\t_\t_\t_\t_\tGloss=,\n70\tko\tk\xF3\tPART\tcop\t_\t_\t_\t_\tGloss=QUOT\n71\tu\t\xF9\tPRON\tpers\tPronType=Prs|Number=Plur|Person=3\t_\t_\t_\tGloss=3PL\n72\tk\xF2n\xF2nt\xF2\tk\u0254\u0300n\u0254nt\u0254n\tNUM\tnum\t_\t_\t_\t_\tGloss=neuf\n73\tb\xE8\xE8\tb\u025B\u0301\u025B\tDET\tdtm\t_\t_\t_\t_\tGloss=tout\n74\tka\tka\tAUX\tpm\tMood=Subj|Polarity=Aff\t_\t_\t_\tGloss=SBJV\n75\ttaga\tt\xE1ga\tVERB\tv\t_\t65\t_\t_\tGloss=aller\n76\tko\tk\xF3\tPART\tcop\t_\t_\t_\t_\tGloss=QUOT\n77\tnin\tn\xED\tSCONJ\tconj\t_\t_\t_\t_\tGloss=quand\n78\tmin\tm\xEEn\tPRON\tprn\tPronType=Rel\t_\t_\t_\tGloss=REL\n79\tseginna\tseginna\tVERB\tv\tAspect=Perf|Valency=1|Polarity=Pos\t85\t_\t_\tGloss=revenir|Morf=revenir,PFV.INTR\n80\tka\tk\xE0\tAUX\tpm\t_\t_\t_\t_\tGloss=INF\n81\ta\t\xE0\tPRON\tpers\tPronType=Prs|Number=Sing|Person=3\t_\t_\t_\tGloss=3SG\n82\ts\xF2r\xF2\ts\u0254\u0300r\u0254\tVERB\tv\t_\t_\t_\t_\tGloss=obtenir\n83\tfura\tf\xFAra\tNOUN\tn\t_\t_\t_\t_\tGloss=feuille\n84\tma\tma\tAUX\tpm\tPolarity=Neg|Aspect=Perf\t_\t_\t_\tGloss=PFV.NEG\n85\tna\tn\xE0\tVERB\tv\t_\t75\t_\t_\tGloss=venir\n86\t,\t,\tPUNCT\t_\t_\t_\t_\t_\tGloss=,\n87\tko\tk\xF3\tPART\tcop\t_\t_\t_\t_\tGloss=QUOT\n88\ta\t\xE0\tPRON\tpers\tPronType=Prs|Number=Sing|Person=3\t_\t_\t_\tGloss=3SG\n89\tb\xE8\tb\u025B\tAUX\tpm\tPolarity=Pos|Aspect=Imp\t_\t_\t_\tGloss=IPFV.AFF\n90\to\t\xF2\tPRON\tprn\t_\t_\t_\t_\tGloss=ce\n91\tden\td\xE9n\tNOUN\tn\t_\t_\t_\t_\tGloss=enfant\n92\tnin\tn\xECn\tDET\tdtm\tPronType=Dem|Definite-Def\t_\t_\t_\tGloss=DEM\n93\tharamuya\th\xE0ramuya\tVERB\tv\t_\t85\t_\t_\tGloss=interdire|Morf=interdire,interdire,ABSTR\n94\tka\tk\xE0\tAUX\tpm\t_\t_\t_\t_\tGloss=INF\n95\to\t\xF2\tPRON\tprn\t_\t_\t_\t_\tGloss=ce\n96\tg\xE8n\tg\u025B\u0301n\tVERB\tv\t_\t_\t_\t_\tGloss=chasser\n97\t,\t,\tPUNCT\t_\t_\t_\t_\t_\tGloss=,\n98\tka\tk\xE0\tAUX\tpm\t_\t_\t_\t_\tGloss=INF\n99\ta\t\xE0\tPRON\tpers\tPronType=Prs|Number=Sing|Person=3\t_\t_\t_\tGloss=3SG\n100\tb\xE8\tb\u025B\tAUX\tpm\tPolarity=Pos|Aspect=Imp\t_\t_\t_\tGloss=IPFV.AFF\n101\ta\t\xE0\tPRON\tpers\tPronType=Prs|Number=Sing|Person=3\t_\t_\t_\tGloss=3SG\n102\tba\tb\xE1\tNOUN\tn\t_\t_\t_\t_\tGloss=m\xE8re\n103\tfana\tf\xE1na\tPART\tprt\t_\t_\t_\t_\tGloss=aussi\n104\tg\xE8n\tg\u025B\u0301n\tVERB\tv\t_\t_\t_\t_\tGloss=chasser\n105\tko\tk\xF3\tPART\tcop\t_\t_\t_\t_\tGloss=QUOT\n106\tu\t\xF9\tPRON\tpers\tPronType=Prs|Number=Plur|Person=3\t_\t_\t_\tGloss=3PL\n107\tka\tka\tAUX\tpm\tMood=Subj|Polarity=Aff\t_\t_\t_\tGloss=SBJV\n108\ta\t\xE0\tPRON\tpers\tPronType=Prs|Number=Sing|Person=3\t_\t_\t_\tGloss=3SG\n109\tfil\xE8\tf\xEDl\u025B\tVERB\tv\t_\t_\t_\t_\tGloss=regarder\n110\tu\t\xF9\tPRON\tpers\tPronType=Prs|Number=Plur|Person=3\t_\t_\t_\tGloss=3PL\n111\ty\xE8r\xE8\ty\u025B\u0300r\u025B\u0302\tDET\tdtm\t_\t_\t_\t_\tGloss=m\xEAme\n112\tni\tn\xED\tSCONJ\tconj\t_\t_\t_\t_\tGloss=si\n113\tmin\tm\xEEn\tPRON\tprn\tPronType=Rel\t_\t_\t_\tGloss=REL\n114\tma\tma\tAUX\tpm\tPolarity=Neg|Aspect=Perf\t_\t_\t_\tGloss=PFV.NEG\n115\ts\xF2n\ts\u0254\u0300n\tVERB\tv\t_\t_\t_\t_\tGloss=accepter\n116\tfana\tf\xE1na\tPART\tprt\t_\t_\t_\t_\tGloss=aussi\n117\tko\tk\xF3\tPART\tcop\t_\t_\t_\t_\tGloss=QUOT\n118\ta\t\xE0\tPRON\tpers\tPronType=Prs|Number=Sing|Person=3\t_\t_\t_\tGloss=3SG\n119\tb\xE8\tb\u025B\tAUX\tpm\tPolarity=Pos|Aspect=Imp\t_\t_\t_\tGloss=IPFV.AFF\n120\to\t\xF2\tPRON\tprn\t_\t_\t_\t_\tGloss=ce\n121\tg\xE8n\tg\u025B\u0301n\tVERB\tv\t_\t_\t_\t_\tGloss=chasser\n122\t,\t,\tPUNCT\t_\t_\t_\t_\t_\tGloss=,\n123\to\t\xF2\tPRON\tprn\t_\t_\t_\t_\tGloss=ce\n124\tni\tni\tCCONJ\tconj\t_\t_\t_\t_\tGloss=et\n125\ta\t\xE0\tPRON\tpers\tPronType=Prs|Number=Sing|Person=3\t_\t_\t_\tGloss=3SG\n126\tba\tb\xE1\tNOUN\tn\t_\t_\t_\t_\tGloss=m\xE8re\n127\tb\xE8\xE8\tb\u025B\u0301\u025B\tDET\tdtm\t_\t_\t_\t_\tGloss=tout\n128\t.\t.\tPUNCT\t_\t_\t_\t_\t_\tGloss=.",

  ud_example_tabs: "1\tThey\tthey\tPRON\tPRP\tCase=Nom|Number=Plur\t2\tnsubj\t2:nsubj|4:nsubj\t_\n2\tbuy\tbuy\tVERB\tVBP\tNumber=Plur|Person=3|Tense=Pres\t0\troot\t0:root\t_\n3\tand\tand\tCONJ\tCC\t_\t4\tcc\t4:cc\t_\n4\tsell\tsell\tVERB\tVBP\tNumber=Plur|Person=3|Tense=Pres\t2\tconj\t2:conj\t_\n5\tbooks\tbook\tNOUN\tNNS\tNumber=Plur\t2\tobj\t2:obj|4:obj\t_\n6\t.\t.\tPUNCT\t.\t_\t2\tpunct\t2:punct\t_",

  ud_example_spaces: "1    They     they    PRON    PRP    Case=Nom|Number=Plur               2    nsubj    2:nsubj|4:nsubj  _\n2    buy      buy     VERB    VBP    Number=Plur|Person=3|Tense=Pres    0    root     0:root          _\n3    and      and     CONJ    CC     _                                  4    cc       4:cc            _\n4    sell     sell    VERB    VBP    Number=Plur|Person=3|Tense=Pres    2    conj     2:conj   _\n5    books    book    NOUN    NNS    Number=Plur                        2    obj      2:obj|4:obj     _\n6    .        .       PUNCT   .      _                                  2    punct    2:punct         _",

  ud_example_modified: "1\tThey\tthey\tPRON\tPRP\tCase=Nom|Number=Plur\t2\tnsubj\t2:nsubj|4:nsubj\t_\n2\tbuy\tbuy\tVERB\tVBP\tNumber=Plur|Person=3|Tense=Presroot\t0\troot\t0:root\t_\n3\tand\tand\tCONJ\tCC\t_\t4\tcc\t4:cc\t_\n4\tsell\tsell\tVERB\tVBP\tNumber=Plur|Person=3|Tense=Presconj\t2\t_\t2\t_\n5\tbooks\tbook\tNOUN\tNNS\tNumber=Plur\t2\tobj\t2:obj|4:obj\t_\n6\t.\t.\tPUNCT\t.\t_\t2\tpunct\t2:punct\t_",

  ud_annotatrix_issue_397: "# sent_id = Not_eating_larvae:2\n# text = \u0413\u044B\u043C \u043D\u044D\u043C\u044B\u04C4\u044D\u0439 \u043D\u0440\u0437\u0431 \u044D\u0442\u043E \u043D\u044B \u043D\u044B\u0440\u044B\u0447\u0432\u0430\u0513\u044B\u04C8\u044B\u0442\u0442\u044B\u04C4\u044D\u043D\u0430\u0442 \u043D\u044D\u043C\u044B\u04C4\u044D\u0439 \u0433\u044B\u043C \u043D\u044B\u0432\u0438\u043D\u0440\u044D\u0442\u0438\u0433\u044B\u043C \u043D\u044B\u0440\u044B\u0447\u0432\u0430\u043D\u0442\u043E\u0439\u0433\u044B\u043C.\n# text[phon] = \u0263\u0259m nem\u0259qej \u043D\u0440\u0437\u0431 \u044D\u0442\u043E n\u0259 n\u0259r\u0259swa\u026C\u0259\u014B\u0259tt\u0259qenat nem\u0259qej \u0263\u0259m n\u0259winreti\u0263\u0259m n\u0259r\u0259swantoj\u0263\u0259m\n# text[rus] = \u0421\u043E\u0431\u0438\u0440\u0430\u043B\u0438 \u043B\u0438\u0447\u0438\u043D\u043E\u043A, \u044F \u0442\u043E\u0436\u0435 \u043F\u043E\u043C\u043E\u0433\u0430\u043B\u0430, \u0434\u043E\u0441\u0442\u0430\u0432\u0430\u043B\u0430 \u043B\u0438\u0447\u0438\u043D\u043E\u043A.\n# text[eng] = We were gathering the grubs, I also helped, I was extracting the grubs.\n# labels = incomplete\n1\t\u0413\u044B\u043C\t\u0433\u044B\u043C\tPRON\t_\tNumber=Sing|Person=1|PronType=Pers\t6\tnsubj\t6:nsubj\tGloss=\u044F\n2\t\u043D\u044D\u043C\u044B\u04C4\u044D\u0439\t\u043D\u044D\u043C\u044B\u04C4\u044D\u0439\tADV\t_\t_\t_\t_\t_\tGloss=\u0442\u043E\u0436\u0435\n3\t\u043D\u0440\u0437\u0431\t_\tX\t_\t_\t6\tdiscourse\t6:discourse\tGloss=\n4\t\u044D\u0442\u043E\t_\tPART\t_\t_\t6\tdiscourse\t6:discourse\tGloss=\n5\t\u043D\u044B\t\u043D\u044B\tX\t_\t_\t6\treparandum\t6:reparandum\tGloss=FST\n6\t\u043D\u044B\u0440\u044B\u0447\u0432\u0430\u0513\u044B\u04C8\u044B\u0442\u0442\u044B\u04C4\u044D\u043D\u0430\u0442\t_\tVERB\t_\t_\t0\troot\t0:root\tGloss=ST-\u043B\u0438\u0447\u0438\u043D\u043A\u0430-CATCH-ST.3SG-PL\n7\t\u043D\u044D\u043C\u044B\u04C4\u044D\u0439\t\u043D\u044D\u043C\u044B\u04C4\u044D\u0439\tADV\t_\t_\t9\tadvmod\t9:advmod\tGloss=\u0442\u043E\u0436\u0435\n8\t\u0433\u044B\u043C\t\u0433\u044B\u043C\tPRON\t_\tNumber=Sing|Person=1|PronType=Pers\t9\tnsubj\t9:nsubj\tGloss=\u044F\n9\t\u043D\u044B\u0432\u0438\u043D\u0440\u044D\u0442\u0438\u0433\u044B\u043C\t\u0432\u0438\u043D\u0440\u044D\u0442\u044B\u043A\tVERB\t_\t_\t6\tparataxis\t6:parataxis\tGloss=ST-\u043F\u043E\u043C\u043E\u0433\u0430\u0442\u044C-NP.1SG\n10\t\u043D\u044B\u0440\u044B\u0447\u0432\u0430\u043D\u0442\u043E\u0439\u0433\u044B\u043C\t_\tVERB\t_\t_\t6\tparataxis\t6:parataxis\tGloss=ST-\u043B\u0438\u0447\u0438\u043D\u043A\u0430-\u0432\u044B\u043D\u0438\u043C\u0430\u0442\u044C-NP.1SG\t\n10.1\t\u0440\u044B\u0447\u0432\u0430\t\u0440\u044B\u0447\u0432\u0430\tNOUN\t_\t_\t_\t_\t10:obj\tGloss=\u043B\u0438\u0447\u0438\u043D\u043A\u0430\n11\t.\t.\tPUNCT\t_\t_\t6\tpunct\t6:punct\t_\t\t\t"
};

},{}],5:[function(require,module,exports){
(function (__dirname){
'use strict';

var path = require('path');

module.exports = {

  assorted: path.join(__dirname, 'assorted.conllu'),
  czech_train: path.join(__dirname, 'cs_cac-ud-train.conllu'),
  turkish_train: path.join(__dirname, 'tr_imst-ud-test.conllu')

};

}).call(this,"/data/corpora")
},{"path":12}],6:[function(require,module,exports){
'use strict';

module.exports = {

  'apertium stream': require('./apertium-stream'),
  apertiumStream: require('./apertium-stream'),
  Brackets: require('./brackets'),
  brackets: require('./brackets'),
  CG3: require('./cg3'),
  cg3: require('./cg3'),
  'CoNLL-U': require('./conllu'),
  conllu: require('./conllu'),
  'notatrix serial': require('./notatrix-serial'),
  notatrixSerial: require('./notatrix-serial'),
  Params: require('./params'),
  params: require('./params'),
  'plain text': require('./plain-text'),
  plainText: require('./plain-text'),
  SD: require('./sd'),
  sd: require('./sd'),

  corpora: require('./corpora')

};

},{"./apertium-stream":1,"./brackets":2,"./cg3":3,"./conllu":4,"./corpora":5,"./notatrix-serial":7,"./params":8,"./plain-text":9,"./sd":10}],7:[function(require,module,exports){
"use strict";

module.exports = {};

},{}],8:[function(require,module,exports){
'use strict';

module.exports = {
	0: [{ form: 'hello' }, { form: 'world' }]
};

},{}],9:[function(require,module,exports){
'use strict';

module.exports = {
  0: 'this is a test',
  1: 'this is a test.',
  2: 'this is a test...',
  3: 'this is a test?',
  4: '\tthis is a test',
  5: 'More sentences = more data; ipso facto, yes.',
  parens_and_numbers: '\u0414\u04D9\u04AF\u043B\u04D9\u0442\u043B\u04D9\u0440\u043D\u0435\u04A3, \u0448\u0443\u043B \u0438\u0441\u04D9\u043F\u0442\u04D9\u043D \u0420\u0443\u0441\u0438\u044F\u043D\u0435\u04A3 \u0434\u04D9, \u0434\u0438\u04A3\u0433\u0435\u0437 \u0447\u0438\u043A\u043B\u04D9\u0440\u0435 \u044F\u0440\u0434\u0430\u043D 12 \u043C\u0438\u043B\u044C (\u044F\u043A\u0438 22,2 \u043A\u043C) \u0435\u0440\u0430\u043A\u043B\u044B\u043A\u0442\u0430 \u0443\u0437\u0443\u044B \u043A\u0438\u043B\u0435\u0448\u0435\u043D\u0433\u04D9\u043D'
};

},{}],10:[function(require,module,exports){
"use strict";

module.exports = {
  0: "And Robert the fourth place .\ncc(Robert, And)\norphan(Robert, place)\npunct(Robert, .)\namod(place, fourth)\ndet(place, the)",

  1: "ROOT And Robert the fourth place .\nroot(ROOT, Robert)\ncc(Robert, And)\norphan(Robert, place)\npunct(Robert, .)\namod(place, fourth)\ndet(place, the)",

  2: "ROOT I love French fries .\nroot(ROOT, love)",

  // https://github.com/UniversalDependencies/docs/blob/pages-source/_u-dep/ccomp.md
  ccomp_1: "He says that you like to swim\nccomp(says, like)\nmark(like, that)",

  ccomp_2: "He says you like to swim\nccomp(says, like)",

  ccomp_3: "The boss said to start digging\nccomp(said, start)\nmark(start, to)",

  ccomp_4: "We started digging\nxcomp(started, digging)",

  ccomp_5: "The important thing is to keep calm.\nccomp(is, keep)\nnsubj(is, thing)",

  ccomp_6: "The problem is that this has never been tried .\nccomp(is, tried)\nnsubj(is, problem)"
};

},{}],11:[function(require,module,exports){

},{}],12:[function(require,module,exports){
(function (process){
// .dirname, .basename, and .extname methods are extracted from Node.js v8.11.1,
// backported and transplited with Babel, with backwards-compat fixes

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function (path) {
  if (typeof path !== 'string') path = path + '';
  if (path.length === 0) return '.';
  var code = path.charCodeAt(0);
  var hasRoot = code === 47 /*/*/;
  var end = -1;
  var matchedSlash = true;
  for (var i = path.length - 1; i >= 1; --i) {
    code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        if (!matchedSlash) {
          end = i;
          break;
        }
      } else {
      // We saw the first non-path separator
      matchedSlash = false;
    }
  }

  if (end === -1) return hasRoot ? '/' : '.';
  if (hasRoot && end === 1) {
    // return '//';
    // Backwards-compat fix:
    return '/';
  }
  return path.slice(0, end);
};

function basename(path) {
  if (typeof path !== 'string') path = path + '';

  var start = 0;
  var end = -1;
  var matchedSlash = true;
  var i;

  for (i = path.length - 1; i >= 0; --i) {
    if (path.charCodeAt(i) === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          start = i + 1;
          break;
        }
      } else if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // path component
      matchedSlash = false;
      end = i + 1;
    }
  }

  if (end === -1) return '';
  return path.slice(start, end);
}

// Uses a mixed approach for backwards-compatibility, as ext behavior changed
// in new Node.js versions, so only basename() above is backported here
exports.basename = function (path, ext) {
  var f = basename(path);
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};

exports.extname = function (path) {
  if (typeof path !== 'string') path = path + '';
  var startDot = -1;
  var startPart = 0;
  var end = -1;
  var matchedSlash = true;
  // Track the state of characters (if any) we see before our first dot and
  // after any path separator we find
  var preDotState = 0;
  for (var i = path.length - 1; i >= 0; --i) {
    var code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          startPart = i + 1;
          break;
        }
        continue;
      }
    if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // extension
      matchedSlash = false;
      end = i + 1;
    }
    if (code === 46 /*.*/) {
        // If this is our first dot, mark it as the start of our extension
        if (startDot === -1)
          startDot = i;
        else if (preDotState !== 1)
          preDotState = 1;
    } else if (startDot !== -1) {
      // We saw a non-dot and non-path separator before our dot, so we should
      // have a good chance at having a non-empty extension
      preDotState = -1;
    }
  }

  if (startDot === -1 || end === -1 ||
      // We saw a non-dot character immediately before the dot
      preDotState === 0 ||
      // The (right-most) trimmed path component is exactly '..'
      preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    return '';
  }
  return path.slice(startDot, end);
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

}).call(this,require('_process'))
},{"_process":13}],13:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],14:[function(require,module,exports){
(function (global){
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define('underscore', factory) :
  (function() {
  	var current = global._;
  	var exports = factory();
  	global._ = exports;
  	exports.noConflict = function() { global._ = current; return exports; };
  })();
}(this, (function () {

  //     Underscore.js 1.10.2
  //     https://underscorejs.org
  //     (c) 2009-2020 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
  //     Underscore may be freely distributed under the MIT license.

  // Baseline setup
  // --------------

  // Establish the root object, `window` (`self`) in the browser, `global`
  // on the server, or `this` in some virtual machines. We use `self`
  // instead of `window` for `WebWorker` support.
  var root = typeof self == 'object' && self.self === self && self ||
            typeof global == 'object' && global.global === global && global ||
            Function('return this')() ||
            {};

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype;
  var SymbolProto = typeof Symbol !== 'undefined' ? Symbol.prototype : null;

  // Create quick reference variables for speed access to core prototypes.
  var push = ArrayProto.push,
      slice = ArrayProto.slice,
      toString = ObjProto.toString,
      hasOwnProperty = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var nativeIsArray = Array.isArray,
      nativeKeys = Object.keys,
      nativeCreate = Object.create;

  // Create references to these builtin functions because we override them.
  var _isNaN = root.isNaN,
      _isFinite = root.isFinite;

  // Naked function reference for surrogate-prototype-swapping.
  var Ctor = function(){};

  // The Underscore object. All exported functions below are added to it in the
  // modules/index-all.js using the mixin function.
  function _(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  }

  // Current version.
  var VERSION = _.VERSION = '1.10.2';

  // Internal function that returns an efficient (for current engines) version
  // of the passed-in callback, to be repeatedly applied in other Underscore
  // functions.
  function optimizeCb(func, context, argCount) {
    if (context === void 0) return func;
    switch (argCount == null ? 3 : argCount) {
      case 1: return function(value) {
        return func.call(context, value);
      };
      // The 2-argument case is omitted because we’re not using it.
      case 3: return function(value, index, collection) {
        return func.call(context, value, index, collection);
      };
      case 4: return function(accumulator, value, index, collection) {
        return func.call(context, accumulator, value, index, collection);
      };
    }
    return function() {
      return func.apply(context, arguments);
    };
  }

  // An internal function to generate callbacks that can be applied to each
  // element in a collection, returning the desired result — either `identity`,
  // an arbitrary callback, a property matcher, or a property accessor.
  function baseIteratee(value, context, argCount) {
    if (value == null) return identity;
    if (isFunction(value)) return optimizeCb(value, context, argCount);
    if (isObject(value) && !isArray(value)) return matcher(value);
    return property(value);
  }

  // External wrapper for our callback generator. Users may customize
  // `_.iteratee` if they want additional predicate/iteratee shorthand styles.
  // This abstraction hides the internal-only argCount argument.
  _.iteratee = iteratee;
  function iteratee(value, context) {
    return baseIteratee(value, context, Infinity);
  }

  // The function we actually call internally. It invokes _.iteratee if
  // overridden, otherwise baseIteratee.
  function cb(value, context, argCount) {
    if (_.iteratee !== iteratee) return _.iteratee(value, context);
    return baseIteratee(value, context, argCount);
  }

  // Some functions take a variable number of arguments, or a few expected
  // arguments at the beginning and then a variable number of values to operate
  // on. This helper accumulates all remaining arguments past the function’s
  // argument length (or an explicit `startIndex`), into an array that becomes
  // the last argument. Similar to ES6’s "rest parameter".
  function restArguments(func, startIndex) {
    startIndex = startIndex == null ? func.length - 1 : +startIndex;
    return function() {
      var length = Math.max(arguments.length - startIndex, 0),
          rest = Array(length),
          index = 0;
      for (; index < length; index++) {
        rest[index] = arguments[index + startIndex];
      }
      switch (startIndex) {
        case 0: return func.call(this, rest);
        case 1: return func.call(this, arguments[0], rest);
        case 2: return func.call(this, arguments[0], arguments[1], rest);
      }
      var args = Array(startIndex + 1);
      for (index = 0; index < startIndex; index++) {
        args[index] = arguments[index];
      }
      args[startIndex] = rest;
      return func.apply(this, args);
    };
  }

  // An internal function for creating a new object that inherits from another.
  function baseCreate(prototype) {
    if (!isObject(prototype)) return {};
    if (nativeCreate) return nativeCreate(prototype);
    Ctor.prototype = prototype;
    var result = new Ctor;
    Ctor.prototype = null;
    return result;
  }

  function shallowProperty(key) {
    return function(obj) {
      return obj == null ? void 0 : obj[key];
    };
  }

  function _has(obj, path) {
    return obj != null && hasOwnProperty.call(obj, path);
  }

  function deepGet(obj, path) {
    var length = path.length;
    for (var i = 0; i < length; i++) {
      if (obj == null) return void 0;
      obj = obj[path[i]];
    }
    return length ? obj : void 0;
  }

  // Helper for collection methods to determine whether a collection
  // should be iterated as an array or as an object.
  // Related: https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
  // Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
  var getLength = shallowProperty('length');
  function isArrayLike(collection) {
    var length = getLength(collection);
    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
  }

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles raw objects in addition to array-likes. Treats all
  // sparse array-likes as if they were dense.
  function each(obj, iteratee, context) {
    iteratee = optimizeCb(iteratee, context);
    var i, length;
    if (isArrayLike(obj)) {
      for (i = 0, length = obj.length; i < length; i++) {
        iteratee(obj[i], i, obj);
      }
    } else {
      var _keys = keys(obj);
      for (i = 0, length = _keys.length; i < length; i++) {
        iteratee(obj[_keys[i]], _keys[i], obj);
      }
    }
    return obj;
  }

  // Return the results of applying the iteratee to each element.
  function map(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var _keys = !isArrayLike(obj) && keys(obj),
        length = (_keys || obj).length,
        results = Array(length);
    for (var index = 0; index < length; index++) {
      var currentKey = _keys ? _keys[index] : index;
      results[index] = iteratee(obj[currentKey], currentKey, obj);
    }
    return results;
  }

  // Create a reducing function iterating left or right.
  function createReduce(dir) {
    // Wrap code that reassigns argument variables in a separate function than
    // the one that accesses `arguments.length` to avoid a perf hit. (#1991)
    var reducer = function(obj, iteratee, memo, initial) {
      var _keys = !isArrayLike(obj) && keys(obj),
          length = (_keys || obj).length,
          index = dir > 0 ? 0 : length - 1;
      if (!initial) {
        memo = obj[_keys ? _keys[index] : index];
        index += dir;
      }
      for (; index >= 0 && index < length; index += dir) {
        var currentKey = _keys ? _keys[index] : index;
        memo = iteratee(memo, obj[currentKey], currentKey, obj);
      }
      return memo;
    };

    return function(obj, iteratee, memo, context) {
      var initial = arguments.length >= 3;
      return reducer(obj, optimizeCb(iteratee, context, 4), memo, initial);
    };
  }

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`.
  var reduce = createReduce(1);

  // The right-associative version of reduce, also known as `foldr`.
  var reduceRight = createReduce(-1);

  // Return the first value which passes a truth test.
  function find(obj, predicate, context) {
    var keyFinder = isArrayLike(obj) ? findIndex : findKey;
    var key = keyFinder(obj, predicate, context);
    if (key !== void 0 && key !== -1) return obj[key];
  }

  // Return all the elements that pass a truth test.
  function filter(obj, predicate, context) {
    var results = [];
    predicate = cb(predicate, context);
    each(obj, function(value, index, list) {
      if (predicate(value, index, list)) results.push(value);
    });
    return results;
  }

  // Return all the elements for which a truth test fails.
  function reject(obj, predicate, context) {
    return filter(obj, negate(cb(predicate)), context);
  }

  // Determine whether all of the elements match a truth test.
  function every(obj, predicate, context) {
    predicate = cb(predicate, context);
    var _keys = !isArrayLike(obj) && keys(obj),
        length = (_keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = _keys ? _keys[index] : index;
      if (!predicate(obj[currentKey], currentKey, obj)) return false;
    }
    return true;
  }

  // Determine if at least one element in the object matches a truth test.
  function some(obj, predicate, context) {
    predicate = cb(predicate, context);
    var _keys = !isArrayLike(obj) && keys(obj),
        length = (_keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = _keys ? _keys[index] : index;
      if (predicate(obj[currentKey], currentKey, obj)) return true;
    }
    return false;
  }

  // Determine if the array or object contains a given item (using `===`).
  function contains(obj, item, fromIndex, guard) {
    if (!isArrayLike(obj)) obj = values(obj);
    if (typeof fromIndex != 'number' || guard) fromIndex = 0;
    return indexOf(obj, item, fromIndex) >= 0;
  }

  // Invoke a method (with arguments) on every item in a collection.
  var invoke = restArguments(function(obj, path, args) {
    var contextPath, func;
    if (isFunction(path)) {
      func = path;
    } else if (isArray(path)) {
      contextPath = path.slice(0, -1);
      path = path[path.length - 1];
    }
    return map(obj, function(context) {
      var method = func;
      if (!method) {
        if (contextPath && contextPath.length) {
          context = deepGet(context, contextPath);
        }
        if (context == null) return void 0;
        method = context[path];
      }
      return method == null ? method : method.apply(context, args);
    });
  });

  // Convenience version of a common use case of `map`: fetching a property.
  function pluck(obj, key) {
    return map(obj, property(key));
  }

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  function where(obj, attrs) {
    return filter(obj, matcher(attrs));
  }

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  function findWhere(obj, attrs) {
    return find(obj, matcher(attrs));
  }

  // Return the maximum element (or element-based computation).
  function max(obj, iteratee, context) {
    var result = -Infinity, lastComputed = -Infinity,
        value, computed;
    if (iteratee == null || typeof iteratee == 'number' && typeof obj[0] != 'object' && obj != null) {
      obj = isArrayLike(obj) ? obj : values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value != null && value > result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      each(obj, function(v, index, list) {
        computed = iteratee(v, index, list);
        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
          result = v;
          lastComputed = computed;
        }
      });
    }
    return result;
  }

  // Return the minimum element (or element-based computation).
  function min(obj, iteratee, context) {
    var result = Infinity, lastComputed = Infinity,
        value, computed;
    if (iteratee == null || typeof iteratee == 'number' && typeof obj[0] != 'object' && obj != null) {
      obj = isArrayLike(obj) ? obj : values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value != null && value < result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      each(obj, function(v, index, list) {
        computed = iteratee(v, index, list);
        if (computed < lastComputed || computed === Infinity && result === Infinity) {
          result = v;
          lastComputed = computed;
        }
      });
    }
    return result;
  }

  // Shuffle a collection.
  function shuffle(obj) {
    return sample(obj, Infinity);
  }

  // Sample **n** random values from a collection using the modern version of the
  // [Fisher-Yates shuffle](https://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
  // If **n** is not specified, returns a single random element.
  // The internal `guard` argument allows it to work with `map`.
  function sample(obj, n, guard) {
    if (n == null || guard) {
      if (!isArrayLike(obj)) obj = values(obj);
      return obj[random(obj.length - 1)];
    }
    var sample = isArrayLike(obj) ? clone(obj) : values(obj);
    var length = getLength(sample);
    n = Math.max(Math.min(n, length), 0);
    var last = length - 1;
    for (var index = 0; index < n; index++) {
      var rand = random(index, last);
      var temp = sample[index];
      sample[index] = sample[rand];
      sample[rand] = temp;
    }
    return sample.slice(0, n);
  }

  // Sort the object's values by a criterion produced by an iteratee.
  function sortBy(obj, iteratee, context) {
    var index = 0;
    iteratee = cb(iteratee, context);
    return pluck(map(obj, function(value, key, list) {
      return {
        value: value,
        index: index++,
        criteria: iteratee(value, key, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index - right.index;
    }), 'value');
  }

  // An internal function used for aggregate "group by" operations.
  function group(behavior, partition) {
    return function(obj, iteratee, context) {
      var result = partition ? [[], []] : {};
      iteratee = cb(iteratee, context);
      each(obj, function(value, index) {
        var key = iteratee(value, index, obj);
        behavior(result, value, key);
      });
      return result;
    };
  }

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  var groupBy = group(function(result, value, key) {
    if (_has(result, key)) result[key].push(value); else result[key] = [value];
  });

  // Indexes the object's values by a criterion, similar to `groupBy`, but for
  // when you know that your index values will be unique.
  var indexBy = group(function(result, value, key) {
    result[key] = value;
  });

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  var countBy = group(function(result, value, key) {
    if (_has(result, key)) result[key]++; else result[key] = 1;
  });

  var reStrSymbol = /[^\ud800-\udfff]|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff]/g;
  // Safely create a real, live array from anything iterable.
  function toArray(obj) {
    if (!obj) return [];
    if (isArray(obj)) return slice.call(obj);
    if (isString(obj)) {
      // Keep surrogate pair characters together
      return obj.match(reStrSymbol);
    }
    if (isArrayLike(obj)) return map(obj, identity);
    return values(obj);
  }

  // Return the number of elements in an object.
  function size(obj) {
    if (obj == null) return 0;
    return isArrayLike(obj) ? obj.length : keys(obj).length;
  }

  // Split a collection into two arrays: one whose elements all satisfy the given
  // predicate, and one whose elements all do not satisfy the predicate.
  var partition = group(function(result, value, pass) {
    result[pass ? 0 : 1].push(value);
  }, true);

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. The **guard** check allows it to work with `map`.
  function first(array, n, guard) {
    if (array == null || array.length < 1) return n == null ? void 0 : [];
    if (n == null || guard) return array[0];
    return initial(array, array.length - n);
  }

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N.
  function initial(array, n, guard) {
    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
  }

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array.
  function last(array, n, guard) {
    if (array == null || array.length < 1) return n == null ? void 0 : [];
    if (n == null || guard) return array[array.length - 1];
    return rest(array, Math.max(0, array.length - n));
  }

  // Returns everything but the first entry of the array. Especially useful on
  // the arguments object. Passing an **n** will return the rest N values in the
  // array.
  function rest(array, n, guard) {
    return slice.call(array, n == null || guard ? 1 : n);
  }

  // Trim out all falsy values from an array.
  function compact(array) {
    return filter(array, Boolean);
  }

  // Internal implementation of a recursive `flatten` function.
  function _flatten(input, shallow, strict, output) {
    output = output || [];
    var idx = output.length;
    for (var i = 0, length = getLength(input); i < length; i++) {
      var value = input[i];
      if (isArrayLike(value) && (isArray(value) || isArguments(value))) {
        // Flatten current level of array or arguments object.
        if (shallow) {
          var j = 0, len = value.length;
          while (j < len) output[idx++] = value[j++];
        } else {
          _flatten(value, shallow, strict, output);
          idx = output.length;
        }
      } else if (!strict) {
        output[idx++] = value;
      }
    }
    return output;
  }

  // Flatten out an array, either recursively (by default), or just one level.
  function flatten(array, shallow) {
    return _flatten(array, shallow, false);
  }

  // Return a version of the array that does not contain the specified value(s).
  var without = restArguments(function(array, otherArrays) {
    return difference(array, otherArrays);
  });

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // The faster algorithm will not work with an iteratee if the iteratee
  // is not a one-to-one function, so providing an iteratee will disable
  // the faster algorithm.
  function uniq(array, isSorted, iteratee, context) {
    if (!isBoolean(isSorted)) {
      context = iteratee;
      iteratee = isSorted;
      isSorted = false;
    }
    if (iteratee != null) iteratee = cb(iteratee, context);
    var result = [];
    var seen = [];
    for (var i = 0, length = getLength(array); i < length; i++) {
      var value = array[i],
          computed = iteratee ? iteratee(value, i, array) : value;
      if (isSorted && !iteratee) {
        if (!i || seen !== computed) result.push(value);
        seen = computed;
      } else if (iteratee) {
        if (!contains(seen, computed)) {
          seen.push(computed);
          result.push(value);
        }
      } else if (!contains(result, value)) {
        result.push(value);
      }
    }
    return result;
  }

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  var union = restArguments(function(arrays) {
    return uniq(_flatten(arrays, true, true));
  });

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  function intersection(array) {
    var result = [];
    var argsLength = arguments.length;
    for (var i = 0, length = getLength(array); i < length; i++) {
      var item = array[i];
      if (contains(result, item)) continue;
      var j;
      for (j = 1; j < argsLength; j++) {
        if (!contains(arguments[j], item)) break;
      }
      if (j === argsLength) result.push(item);
    }
    return result;
  }

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  var difference = restArguments(function(array, rest) {
    rest = _flatten(rest, true, true);
    return filter(array, function(value){
      return !contains(rest, value);
    });
  });

  // Complement of zip. Unzip accepts an array of arrays and groups
  // each array's elements on shared indices.
  function unzip(array) {
    var length = array && max(array, getLength).length || 0;
    var result = Array(length);

    for (var index = 0; index < length; index++) {
      result[index] = pluck(array, index);
    }
    return result;
  }

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  var zip = restArguments(unzip);

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values. Passing by pairs is the reverse of pairs.
  function object(list, values) {
    var result = {};
    for (var i = 0, length = getLength(list); i < length; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  }

  // Generator function to create the findIndex and findLastIndex functions.
  function createPredicateIndexFinder(dir) {
    return function(array, predicate, context) {
      predicate = cb(predicate, context);
      var length = getLength(array);
      var index = dir > 0 ? 0 : length - 1;
      for (; index >= 0 && index < length; index += dir) {
        if (predicate(array[index], index, array)) return index;
      }
      return -1;
    };
  }

  // Returns the first index on an array-like that passes a predicate test.
  var findIndex = createPredicateIndexFinder(1);
  var findLastIndex = createPredicateIndexFinder(-1);

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  function sortedIndex(array, obj, iteratee, context) {
    iteratee = cb(iteratee, context, 1);
    var value = iteratee(obj);
    var low = 0, high = getLength(array);
    while (low < high) {
      var mid = Math.floor((low + high) / 2);
      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
    }
    return low;
  }

  // Generator function to create the indexOf and lastIndexOf functions.
  function createIndexFinder(dir, predicateFind, sortedIndex) {
    return function(array, item, idx) {
      var i = 0, length = getLength(array);
      if (typeof idx == 'number') {
        if (dir > 0) {
          i = idx >= 0 ? idx : Math.max(idx + length, i);
        } else {
          length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
        }
      } else if (sortedIndex && idx && length) {
        idx = sortedIndex(array, item);
        return array[idx] === item ? idx : -1;
      }
      if (item !== item) {
        idx = predicateFind(slice.call(array, i, length), isNaN);
        return idx >= 0 ? idx + i : -1;
      }
      for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
        if (array[idx] === item) return idx;
      }
      return -1;
    };
  }

  // Return the position of the first occurrence of an item in an array,
  // or -1 if the item is not included in the array.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  var indexOf = createIndexFinder(1, findIndex, sortedIndex);
  var lastIndexOf = createIndexFinder(-1, findLastIndex);

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](https://docs.python.org/library/functions.html#range).
  function range(start, stop, step) {
    if (stop == null) {
      stop = start || 0;
      start = 0;
    }
    if (!step) {
      step = stop < start ? -1 : 1;
    }

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var range = Array(length);

    for (var idx = 0; idx < length; idx++, start += step) {
      range[idx] = start;
    }

    return range;
  }

  // Chunk a single array into multiple arrays, each containing `count` or fewer
  // items.
  function chunk(array, count) {
    if (count == null || count < 1) return [];
    var result = [];
    var i = 0, length = array.length;
    while (i < length) {
      result.push(slice.call(array, i, i += count));
    }
    return result;
  }

  // Function (ahem) Functions
  // ------------------

  // Determines whether to execute a function as a constructor
  // or a normal function with the provided arguments.
  function executeBound(sourceFunc, boundFunc, context, callingContext, args) {
    if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
    var self = baseCreate(sourceFunc.prototype);
    var result = sourceFunc.apply(self, args);
    if (isObject(result)) return result;
    return self;
  }

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  var bind = restArguments(function(func, context, args) {
    if (!isFunction(func)) throw new TypeError('Bind must be called on a function');
    var bound = restArguments(function(callArgs) {
      return executeBound(func, bound, context, this, args.concat(callArgs));
    });
    return bound;
  });

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context. _ acts
  // as a placeholder by default, allowing any combination of arguments to be
  // pre-filled. Set `partial.placeholder` for a custom placeholder argument.
  var partial = restArguments(function(func, boundArgs) {
    var placeholder = partial.placeholder;
    var bound = function() {
      var position = 0, length = boundArgs.length;
      var args = Array(length);
      for (var i = 0; i < length; i++) {
        args[i] = boundArgs[i] === placeholder ? arguments[position++] : boundArgs[i];
      }
      while (position < arguments.length) args.push(arguments[position++]);
      return executeBound(func, bound, this, this, args);
    };
    return bound;
  });

  partial.placeholder = _;

  // Bind a number of an object's methods to that object. Remaining arguments
  // are the method names to be bound. Useful for ensuring that all callbacks
  // defined on an object belong to it.
  var bindAll = restArguments(function(obj, _keys) {
    _keys = _flatten(_keys, false, false);
    var index = _keys.length;
    if (index < 1) throw new Error('bindAll must be passed function names');
    while (index--) {
      var key = _keys[index];
      obj[key] = bind(obj[key], obj);
    }
  });

  // Memoize an expensive function by storing its results.
  function memoize(func, hasher) {
    var memoize = function(key) {
      var cache = memoize.cache;
      var address = '' + (hasher ? hasher.apply(this, arguments) : key);
      if (!_has(cache, address)) cache[address] = func.apply(this, arguments);
      return cache[address];
    };
    memoize.cache = {};
    return memoize;
  }

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  var delay = restArguments(function(func, wait, args) {
    return setTimeout(function() {
      return func.apply(null, args);
    }, wait);
  });

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  var defer = partial(delay, _, 1);

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  function throttle(func, wait, options) {
    var timeout, context, args, result;
    var previous = 0;
    if (!options) options = {};

    var later = function() {
      previous = options.leading === false ? 0 : now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };

    var throttled = function() {
      var _now = now();
      if (!previous && options.leading === false) previous = _now;
      var remaining = wait - (_now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = _now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };

    throttled.cancel = function() {
      clearTimeout(timeout);
      previous = 0;
      timeout = context = args = null;
    };

    return throttled;
  }

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  function debounce(func, wait, immediate) {
    var timeout, result;

    var later = function(context, args) {
      timeout = null;
      if (args) result = func.apply(context, args);
    };

    var debounced = restArguments(function(args) {
      if (timeout) clearTimeout(timeout);
      if (immediate) {
        var callNow = !timeout;
        timeout = setTimeout(later, wait);
        if (callNow) result = func.apply(this, args);
      } else {
        timeout = delay(later, wait, this, args);
      }

      return result;
    });

    debounced.cancel = function() {
      clearTimeout(timeout);
      timeout = null;
    };

    return debounced;
  }

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  function wrap(func, wrapper) {
    return partial(wrapper, func);
  }

  // Returns a negated version of the passed-in predicate.
  function negate(predicate) {
    return function() {
      return !predicate.apply(this, arguments);
    };
  }

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  function compose() {
    var args = arguments;
    var start = args.length - 1;
    return function() {
      var i = start;
      var result = args[start].apply(this, arguments);
      while (i--) result = args[i].call(this, result);
      return result;
    };
  }

  // Returns a function that will only be executed on and after the Nth call.
  function after(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  }

  // Returns a function that will only be executed up to (but not including) the Nth call.
  function before(times, func) {
    var memo;
    return function() {
      if (--times > 0) {
        memo = func.apply(this, arguments);
      }
      if (times <= 1) func = null;
      return memo;
    };
  }

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  var once = partial(before, 2);

  // Object Functions
  // ----------------

  // Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
  var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');
  var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString',
    'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];

  function collectNonEnumProps(obj, _keys) {
    var nonEnumIdx = nonEnumerableProps.length;
    var constructor = obj.constructor;
    var proto = isFunction(constructor) && constructor.prototype || ObjProto;

    // Constructor is a special case.
    var prop = 'constructor';
    if (_has(obj, prop) && !contains(_keys, prop)) _keys.push(prop);

    while (nonEnumIdx--) {
      prop = nonEnumerableProps[nonEnumIdx];
      if (prop in obj && obj[prop] !== proto[prop] && !contains(_keys, prop)) {
        _keys.push(prop);
      }
    }
  }

  // Retrieve the names of an object's own properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`.
  function keys(obj) {
    if (!isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var _keys = [];
    for (var key in obj) if (_has(obj, key)) _keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, _keys);
    return _keys;
  }

  // Retrieve all the property names of an object.
  function allKeys(obj) {
    if (!isObject(obj)) return [];
    var _keys = [];
    for (var key in obj) _keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, _keys);
    return _keys;
  }

  // Retrieve the values of an object's properties.
  function values(obj) {
    var _keys = keys(obj);
    var length = _keys.length;
    var values = Array(length);
    for (var i = 0; i < length; i++) {
      values[i] = obj[_keys[i]];
    }
    return values;
  }

  // Returns the results of applying the iteratee to each element of the object.
  // In contrast to map it returns an object.
  function mapObject(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var _keys = keys(obj),
        length = _keys.length,
        results = {};
    for (var index = 0; index < length; index++) {
      var currentKey = _keys[index];
      results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
    }
    return results;
  }

  // Convert an object into a list of `[key, value]` pairs.
  // The opposite of object.
  function pairs(obj) {
    var _keys = keys(obj);
    var length = _keys.length;
    var pairs = Array(length);
    for (var i = 0; i < length; i++) {
      pairs[i] = [_keys[i], obj[_keys[i]]];
    }
    return pairs;
  }

  // Invert the keys and values of an object. The values must be serializable.
  function invert(obj) {
    var result = {};
    var _keys = keys(obj);
    for (var i = 0, length = _keys.length; i < length; i++) {
      result[obj[_keys[i]]] = _keys[i];
    }
    return result;
  }

  // Return a sorted list of the function names available on the object.
  function functions(obj) {
    var names = [];
    for (var key in obj) {
      if (isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  }

  // An internal function for creating assigner functions.
  function createAssigner(keysFunc, defaults) {
    return function(obj) {
      var length = arguments.length;
      if (defaults) obj = Object(obj);
      if (length < 2 || obj == null) return obj;
      for (var index = 1; index < length; index++) {
        var source = arguments[index],
            _keys = keysFunc(source),
            l = _keys.length;
        for (var i = 0; i < l; i++) {
          var key = _keys[i];
          if (!defaults || obj[key] === void 0) obj[key] = source[key];
        }
      }
      return obj;
    };
  }

  // Extend a given object with all the properties in passed-in object(s).
  var extend = createAssigner(allKeys);

  // Assigns a given object with all the own properties in the passed-in object(s).
  // (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
  var extendOwn = createAssigner(keys);

  // Returns the first key on an object that passes a predicate test.
  function findKey(obj, predicate, context) {
    predicate = cb(predicate, context);
    var _keys = keys(obj), key;
    for (var i = 0, length = _keys.length; i < length; i++) {
      key = _keys[i];
      if (predicate(obj[key], key, obj)) return key;
    }
  }

  // Internal pick helper function to determine if `obj` has key `key`.
  function keyInObj(value, key, obj) {
    return key in obj;
  }

  // Return a copy of the object only containing the whitelisted properties.
  var pick = restArguments(function(obj, _keys) {
    var result = {}, iteratee = _keys[0];
    if (obj == null) return result;
    if (isFunction(iteratee)) {
      if (_keys.length > 1) iteratee = optimizeCb(iteratee, _keys[1]);
      _keys = allKeys(obj);
    } else {
      iteratee = keyInObj;
      _keys = _flatten(_keys, false, false);
      obj = Object(obj);
    }
    for (var i = 0, length = _keys.length; i < length; i++) {
      var key = _keys[i];
      var value = obj[key];
      if (iteratee(value, key, obj)) result[key] = value;
    }
    return result;
  });

  // Return a copy of the object without the blacklisted properties.
  var omit = restArguments(function(obj, _keys) {
    var iteratee = _keys[0], context;
    if (isFunction(iteratee)) {
      iteratee = negate(iteratee);
      if (_keys.length > 1) context = _keys[1];
    } else {
      _keys = map(_flatten(_keys, false, false), String);
      iteratee = function(value, key) {
        return !contains(_keys, key);
      };
    }
    return pick(obj, iteratee, context);
  });

  // Fill in a given object with default properties.
  var defaults = createAssigner(allKeys, true);

  // Creates an object that inherits from the given prototype object.
  // If additional properties are provided then they will be added to the
  // created object.
  function create(prototype, props) {
    var result = baseCreate(prototype);
    if (props) extendOwn(result, props);
    return result;
  }

  // Create a (shallow-cloned) duplicate of an object.
  function clone(obj) {
    if (!isObject(obj)) return obj;
    return isArray(obj) ? obj.slice() : extend({}, obj);
  }

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  function tap(obj, interceptor) {
    interceptor(obj);
    return obj;
  }

  // Returns whether an object has a given set of `key:value` pairs.
  function isMatch(object, attrs) {
    var _keys = keys(attrs), length = _keys.length;
    if (object == null) return !length;
    var obj = Object(object);
    for (var i = 0; i < length; i++) {
      var key = _keys[i];
      if (attrs[key] !== obj[key] || !(key in obj)) return false;
    }
    return true;
  }


  // Internal recursive comparison function for `isEqual`.
  function eq(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](https://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a === 1 / b;
    // `null` or `undefined` only equal to itself (strict comparison).
    if (a == null || b == null) return false;
    // `NaN`s are equivalent, but non-reflexive.
    if (a !== a) return b !== b;
    // Exhaust primitive checks
    var type = typeof a;
    if (type !== 'function' && type !== 'object' && typeof b != 'object') return false;
    return deepEq(a, b, aStack, bStack);
  }

  // Internal recursive comparison function for `isEqual`.
  function deepEq(a, b, aStack, bStack) {
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className !== toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
      case '[object RegExp]':
      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return '' + a === '' + b;
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive.
        // Object(NaN) is equivalent to NaN.
        if (+a !== +a) return +b !== +b;
        // An `egal` comparison is performed for other numeric values.
        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a === +b;
      case '[object Symbol]':
        return SymbolProto.valueOf.call(a) === SymbolProto.valueOf.call(b);
    }

    var areArrays = className === '[object Array]';
    if (!areArrays) {
      if (typeof a != 'object' || typeof b != 'object') return false;

      // Objects with different constructors are not equivalent, but `Object`s or `Array`s
      // from different frames are.
      var aCtor = a.constructor, bCtor = b.constructor;
      if (aCtor !== bCtor && !(isFunction(aCtor) && aCtor instanceof aCtor &&
                               isFunction(bCtor) && bCtor instanceof bCtor)
                          && ('constructor' in a && 'constructor' in b)) {
        return false;
      }
    }
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.

    // Initializing stack of traversed objects.
    // It's done here since we only need them for objects and arrays comparison.
    aStack = aStack || [];
    bStack = bStack || [];
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] === a) return bStack[length] === b;
    }

    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);

    // Recursively compare objects and arrays.
    if (areArrays) {
      // Compare array lengths to determine if a deep comparison is necessary.
      length = a.length;
      if (length !== b.length) return false;
      // Deep compare the contents, ignoring non-numeric properties.
      while (length--) {
        if (!eq(a[length], b[length], aStack, bStack)) return false;
      }
    } else {
      // Deep compare objects.
      var _keys = keys(a), key;
      length = _keys.length;
      // Ensure that both objects contain the same number of properties before comparing deep equality.
      if (keys(b).length !== length) return false;
      while (length--) {
        // Deep compare each member
        key = _keys[length];
        if (!(_has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return true;
  }

  // Perform a deep comparison to check if two objects are equal.
  function isEqual(a, b) {
    return eq(a, b);
  }

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  function isEmpty(obj) {
    if (obj == null) return true;
    if (isArrayLike(obj) && (isArray(obj) || isString(obj) || isArguments(obj))) return obj.length === 0;
    return keys(obj).length === 0;
  }

  // Is a given value a DOM element?
  function isElement(obj) {
    return !!(obj && obj.nodeType === 1);
  }

  // Internal function for creating a toString-based type tester.
  function tagTester(name) {
    return function(obj) {
      return toString.call(obj) === '[object ' + name + ']';
    };
  }

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  var isArray = nativeIsArray || tagTester('Array');

  // Is a given variable an object?
  function isObject(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
  }

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError, isMap, isWeakMap, isSet, isWeakSet.
  var isArguments = tagTester('Arguments');
  var isFunction = tagTester('Function');
  var isString = tagTester('String');
  var isNumber = tagTester('Number');
  var isDate = tagTester('Date');
  var isRegExp = tagTester('RegExp');
  var isError = tagTester('Error');
  var isSymbol = tagTester('Symbol');
  var isMap = tagTester('Map');
  var isWeakMap = tagTester('WeakMap');
  var isSet = tagTester('Set');
  var isWeakSet = tagTester('WeakSet');

  // Define a fallback version of the method in browsers (ahem, IE < 9), where
  // there isn't any inspectable "Arguments" type.
  (function() {
    if (!isArguments(arguments)) {
      isArguments = function(obj) {
        return _has(obj, 'callee');
      };
    }
  }());

  // Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
  // IE 11 (#1621), Safari 8 (#1929), and PhantomJS (#2236).
  var nodelist = root.document && root.document.childNodes;
  if (typeof /./ != 'function' && typeof Int8Array != 'object' && typeof nodelist != 'function') {
    isFunction = function(obj) {
      return typeof obj == 'function' || false;
    };
  }

  // Is a given object a finite number?
  function isFinite(obj) {
    return !isSymbol(obj) && _isFinite(obj) && !_isNaN(parseFloat(obj));
  }

  // Is the given value `NaN`?
  function isNaN(obj) {
    return isNumber(obj) && _isNaN(obj);
  }

  // Is a given value a boolean?
  function isBoolean(obj) {
    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
  }

  // Is a given value equal to null?
  function isNull(obj) {
    return obj === null;
  }

  // Is a given variable undefined?
  function isUndefined(obj) {
    return obj === void 0;
  }

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  function has(obj, path) {
    if (!isArray(path)) {
      return _has(obj, path);
    }
    var length = path.length;
    for (var i = 0; i < length; i++) {
      var key = path[i];
      if (obj == null || !hasOwnProperty.call(obj, key)) {
        return false;
      }
      obj = obj[key];
    }
    return !!length;
  }

  // Utility Functions
  // -----------------

  // Keep the identity function around for default iteratees.
  function identity(value) {
    return value;
  }

  // Predicate-generating functions. Often useful outside of Underscore.
  function constant(value) {
    return function() {
      return value;
    };
  }

  function noop(){}

  // Creates a function that, when passed an object, will traverse that object’s
  // properties down the given `path`, specified as an array of keys or indexes.
  function property(path) {
    if (!isArray(path)) {
      return shallowProperty(path);
    }
    return function(obj) {
      return deepGet(obj, path);
    };
  }

  // Generates a function for a given object that returns a given property.
  function propertyOf(obj) {
    if (obj == null) {
      return function(){};
    }
    return function(path) {
      return !isArray(path) ? obj[path] : deepGet(obj, path);
    };
  }

  // Returns a predicate for checking whether an object has a given set of
  // `key:value` pairs.
  function matcher(attrs) {
    attrs = extendOwn({}, attrs);
    return function(obj) {
      return isMatch(obj, attrs);
    };
  }

  // Run a function **n** times.
  function times(n, iteratee, context) {
    var accum = Array(Math.max(0, n));
    iteratee = optimizeCb(iteratee, context, 1);
    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
    return accum;
  }

  // Return a random integer between min and max (inclusive).
  function random(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  }

  // A (possibly faster) way to get the current timestamp as an integer.
  var now = Date.now || function() {
    return new Date().getTime();
  };

  // List of HTML entities for escaping.
  var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;'
  };
  var unescapeMap = invert(escapeMap);

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  function createEscaper(map) {
    var escaper = function(match) {
      return map[match];
    };
    // Regexes for identifying a key that needs to be escaped.
    var source = '(?:' + keys(map).join('|') + ')';
    var testRegexp = RegExp(source);
    var replaceRegexp = RegExp(source, 'g');
    return function(string) {
      string = string == null ? '' : '' + string;
      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
    };
  }
  var escape = createEscaper(escapeMap);
  var unescape = createEscaper(unescapeMap);

  // Traverses the children of `obj` along `path`. If a child is a function, it
  // is invoked with its parent as context. Returns the value of the final
  // child, or `fallback` if any child is undefined.
  function result(obj, path, fallback) {
    if (!isArray(path)) path = [path];
    var length = path.length;
    if (!length) {
      return isFunction(fallback) ? fallback.call(obj) : fallback;
    }
    for (var i = 0; i < length; i++) {
      var prop = obj == null ? void 0 : obj[path[i]];
      if (prop === void 0) {
        prop = fallback;
        i = length; // Ensure we don't continue iterating.
      }
      obj = isFunction(prop) ? prop.call(obj) : prop;
    }
    return obj;
  }

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  function uniqueId(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  }

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  var templateSettings = _.templateSettings = {
    evaluate: /<%([\s\S]+?)%>/g,
    interpolate: /<%=([\s\S]+?)%>/g,
    escape: /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'": "'",
    '\\': '\\',
    '\r': 'r',
    '\n': 'n',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escapeRegExp = /\\|'|\r|\n|\u2028|\u2029/g;

  var escapeChar = function(match) {
    return '\\' + escapes[match];
  };

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  // NB: `oldSettings` only exists for backwards compatibility.
  function template(text, settings, oldSettings) {
    if (!settings && oldSettings) settings = oldSettings;
    settings = defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset).replace(escapeRegExp, escapeChar);
      index = offset + match.length;

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      } else if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      } else if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }

      // Adobe VMs need the match returned to produce the correct offset.
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + 'return __p;\n';

    var render;
    try {
      render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled source as a convenience for precompilation.
    var argument = settings.variable || 'obj';
    template.source = 'function(' + argument + '){\n' + source + '}';

    return template;
  }

  // Add a "chain" function. Start chaining a wrapped Underscore object.
  function chain(obj) {
    var instance = _(obj);
    instance._chain = true;
    return instance;
  }

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  function chainResult(instance, obj) {
    return instance._chain ? _(obj).chain() : obj;
  }

  // Add your own custom functions to the Underscore object.
  function mixin(obj) {
    each(functions(obj), function(name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return chainResult(this, func.apply(_, args));
      };
    });
    return _;
  }

  // Add all mutator Array functions to the wrapper.
  each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
      return chainResult(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return chainResult(this, method.apply(this._wrapped, arguments));
    };
  });

  // Extracts the result from a wrapped and chained object.
  _.prototype.value = function() {
    return this._wrapped;
  };

  // Provide unwrapping proxy for some methods used in engine operations
  // such as arithmetic and JSON stringification.
  _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;

  _.prototype.toString = function() {
    return String(this._wrapped);
  };

  var allExports = ({
    'default': _,
    VERSION: VERSION,
    iteratee: iteratee,
    restArguments: restArguments,
    each: each,
    forEach: each,
    map: map,
    collect: map,
    reduce: reduce,
    foldl: reduce,
    inject: reduce,
    reduceRight: reduceRight,
    foldr: reduceRight,
    find: find,
    detect: find,
    filter: filter,
    select: filter,
    reject: reject,
    every: every,
    all: every,
    some: some,
    any: some,
    contains: contains,
    includes: contains,
    include: contains,
    invoke: invoke,
    pluck: pluck,
    where: where,
    findWhere: findWhere,
    max: max,
    min: min,
    shuffle: shuffle,
    sample: sample,
    sortBy: sortBy,
    groupBy: groupBy,
    indexBy: indexBy,
    countBy: countBy,
    toArray: toArray,
    size: size,
    partition: partition,
    first: first,
    head: first,
    take: first,
    initial: initial,
    last: last,
    rest: rest,
    tail: rest,
    drop: rest,
    compact: compact,
    flatten: flatten,
    without: without,
    uniq: uniq,
    unique: uniq,
    union: union,
    intersection: intersection,
    difference: difference,
    unzip: unzip,
    zip: zip,
    object: object,
    findIndex: findIndex,
    findLastIndex: findLastIndex,
    sortedIndex: sortedIndex,
    indexOf: indexOf,
    lastIndexOf: lastIndexOf,
    range: range,
    chunk: chunk,
    bind: bind,
    partial: partial,
    bindAll: bindAll,
    memoize: memoize,
    delay: delay,
    defer: defer,
    throttle: throttle,
    debounce: debounce,
    wrap: wrap,
    negate: negate,
    compose: compose,
    after: after,
    before: before,
    once: once,
    keys: keys,
    allKeys: allKeys,
    values: values,
    mapObject: mapObject,
    pairs: pairs,
    invert: invert,
    functions: functions,
    methods: functions,
    extend: extend,
    extendOwn: extendOwn,
    assign: extendOwn,
    findKey: findKey,
    pick: pick,
    omit: omit,
    defaults: defaults,
    create: create,
    clone: clone,
    tap: tap,
    isMatch: isMatch,
    isEqual: isEqual,
    isEmpty: isEmpty,
    isElement: isElement,
    isArray: isArray,
    isObject: isObject,
    isArguments: isArguments,
    isFunction: isFunction,
    isString: isString,
    isNumber: isNumber,
    isDate: isDate,
    isRegExp: isRegExp,
    isError: isError,
    isSymbol: isSymbol,
    isMap: isMap,
    isWeakMap: isWeakMap,
    isSet: isSet,
    isWeakSet: isWeakSet,
    isFinite: isFinite,
    isNaN: isNaN,
    isBoolean: isBoolean,
    isNull: isNull,
    isUndefined: isUndefined,
    has: has,
    identity: identity,
    constant: constant,
    noop: noop,
    property: property,
    propertyOf: propertyOf,
    matcher: matcher,
    matches: matcher,
    times: times,
    random: random,
    now: now,
    escape: escape,
    unescape: unescape,
    result: result,
    uniqueId: uniqueId,
    templateSettings: templateSettings,
    template: template,
    chain: chain,
    mixin: mixin
  });

  // Add all of the Underscore functions to the wrapper object.
  var _$1 = mixin(allExports);
  // Legacy Node.js API
  _$1._ = _$1;

  return _$1;

})));


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],15:[function(require,module,exports){
/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex;
  // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4
  return ([
    bth[buf[i++]], bth[buf[i++]],
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]],
    bth[buf[i++]], bth[buf[i++]],
    bth[buf[i++]], bth[buf[i++]]
  ]).join('');
}

module.exports = bytesToUuid;

},{}],16:[function(require,module,exports){
// Unique ID creation requires a high quality random # generator.  In the
// browser this is a little complicated due to unknown quality of Math.random()
// and inconsistent support for the `crypto` API.  We do the best we can via
// feature-detection

// getRandomValues needs to be invoked in a context where "this" is a Crypto
// implementation. Also, find the complete implementation of crypto on IE11.
var getRandomValues = (typeof(crypto) != 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto)) ||
                      (typeof(msCrypto) != 'undefined' && typeof window.msCrypto.getRandomValues == 'function' && msCrypto.getRandomValues.bind(msCrypto));

if (getRandomValues) {
  // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
  var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef

  module.exports = function whatwgRNG() {
    getRandomValues(rnds8);
    return rnds8;
  };
} else {
  // Math.random()-based (RNG)
  //
  // If all else fails, use Math.random().  It's fast, but is of unspecified
  // quality.
  var rnds = new Array(16);

  module.exports = function mathRNG() {
    for (var i = 0, r; i < 16; i++) {
      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
      rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return rnds;
  };
}

},{}],17:[function(require,module,exports){
var rng = require('./lib/rng');
var bytesToUuid = require('./lib/bytesToUuid');

function v4(options, buf, offset) {
  var i = buf && offset || 0;

  if (typeof(options) == 'string') {
    buf = options === 'binary' ? new Array(16) : null;
    options = null;
  }
  options = options || {};

  var rnds = options.random || (options.rng || rng)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    for (var ii = 0; ii < 16; ++ii) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || bytesToUuid(rnds);
}

module.exports = v4;

},{"./lib/bytesToUuid":15,"./lib/rng":16}],18:[function(require,module,exports){
'use strict';

var _ = require('underscore');

var utils = require('./utils');
var ConverterError = utils.ConverterError;
var nx = require('./nx');

module.exports = function (input, options) {
  try {

    var sent = new nx.Sentence(input, options);
    sent.from = function (format) {
      return convert(sent.input, _.extend({
        interpretAs: format
      }, options));
    };

    return sent;
  } catch (e) {

    if (e instanceof utils.ToolError || e instanceof utils.NxError) throw new ConverterError('FATAL: unable to convert: ' + e.message);

    throw e;
  }
};

},{"./nx":80,"./utils":94,"underscore":14}],19:[function(require,module,exports){
'use strict';

var _ = require('underscore');

var utils = require('./utils');
var DetectorError = utils.DetectorError;

var as = {

	'apertium stream': require('./formats/apertium-stream').detect,
	apertiumStream: require('./formats/apertium-stream').detect,
	Brackets: require('./formats/brackets').detect,
	brackets: require('./formats/brackets').detect,
	CG3: require('./formats/cg3').detect,
	cg3: require('./formats/cg3').detect,
	'CoNLL-U': require('./formats/conllu').detect,
	conllu: require('./formats/conllu').detect,
	'notatrix serial': require('./formats/notatrix-serial').detect,
	notatrixSerial: require('./formats/notatrix-serial').detect,
	Params: require('./formats/params').detect,
	params: require('./formats/params').detect,
	'plain text': require('./formats/plain-text').detect,
	plainText: require('./formats/plain-text').detect,
	SD: require('./formats/sd').detect,
	sd: require('./formats/sd').detect

};

module.exports = function (text, options) {

	options = _.defaults(options, {
		suppressDetectorErrors: true,
		returnAllMatches: true,
		requireOneMatch: false
	});

	var matches = utils.formats.map(function (format) {

		try {
			return as[format](text, options);
		} catch (e) {

			if (e instanceof DetectorError) return;

			throw e;
		}
	}).filter(utils.thin);

	if (!matches.length && !options.suppressDetectorErrors) throw new DetectorError('Unable to detect format', text, options);

	if (matches.length > 1 && !options.suppressDetectorErrors && options.requireOneMatch) throw new DetectorError('Detected multiple formats', text, options);

	return options.returnAllMatches ? matches : matches[0];
};
module.exports.as = as;

},{"./formats/apertium-stream":23,"./formats/brackets":30,"./formats/cg3":36,"./formats/conllu":42,"./formats/notatrix-serial":50,"./formats/params":57,"./formats/plain-text":64,"./formats/sd":71,"./utils":94,"underscore":14}],20:[function(require,module,exports){
'use strict';

var utils = require('../../utils');
var DetectorError = utils.DetectorError;

module.exports = function (text, options) {
  throw new DetectorError('not implemented');
};

},{"../../utils":94}],21:[function(require,module,exports){
"use strict";

module.exports = null;

},{}],22:[function(require,module,exports){
'use strict';

var utils = require('../../utils');
var GeneratorError = utils.GeneratorError;

module.exports = function (text, options) {
  //throw new GeneratorError('not implemented');
};

},{"../../utils":94}],23:[function(require,module,exports){
'use strict';

module.exports = {

  name: 'apertium stream',
  fields: require('./fields'),
  split: require('./splitter'),
  detect: require('./detector'),
  parse: require('./parser'),
  generate: require('./generator')

};

},{"./detector":20,"./fields":21,"./generator":22,"./parser":24,"./splitter":25}],24:[function(require,module,exports){
'use strict';

var utils = require('../../utils');
var ParserError = utils.ParserError;

module.exports = function (text, options) {
  //throw new ParserError('not implemented');
};

},{"../../utils":94}],25:[function(require,module,exports){
'use strict';

var utils = require('../../utils');
var SplitterError = utils.SplitterError;

module.exports = function (text, options) {
  //throw new SplitterError('not implemented', text, options);
};

},{"../../utils":94}],26:[function(require,module,exports){
'use strict';

var _ = require('underscore');

var utils = require('../../utils');
var DetectorError = utils.DetectorError;

module.exports = function (text, options) {

  options = _.defaults(options, {
    allowEmptyString: false,
    allowTrailingWhitespace: true,
    allowLeadingWhitespace: true,
    allowNoDependencies: false,
    allowNewlines: false
  });

  if (!text && !options.allowEmptyString) throw new DetectorError('Illegal Brackets: empty string', text, options);

  if (utils.isJSONSerializable(text)) throw new DetectorError('Illegal Brackets: JSON object', text, options);

  if (/\n/.test(text) && !options.allowNewlines) throw new DetectorError('Illegal Brackets: contains newlines', text, options);

  // internal stuff
  var parsing = null;
  var depth = 0;
  var sawBracket = false;

  text.split('').forEach(function (char, i) {

    switch (char) {

      case '[':
        if (parsing === ']') throw new DetectorError('Illegal Brackets: invalid sequence "]["', text, options);

        sawBracket = true;
        depth += 1;
        break;

      case ']':
        if (parsing === '[') throw new DetectorError('Illegal Brackets: invalid sequence "[]"', text, options);

        sawBracket = true;
        depth -= 1;
        break;

      case ' ':
      case '\t':
      case '\n':

        if (!options.allowLeadingWhitespace) {
          if (parsing !== null && !utils.re.whitespace.test(parsing)) throw new DetectorError('Illegal Brackets: contains leading whitespace', text, options);
        }
        break;
    }

    parsing = char;
  });

  if (!sawBracket && !options.allowNoDependencies) throw new DetectorError('Illegal Brackets: contains no dependencies', text, options);

  if (depth !== 0) throw new DetectorError('Illegal Brackets: bracket mismatch', text, options);

  if (utils.re.whitespace.test(parsing) && !options.allowTrailingWhitespace) throw new DetectorError('Illegal Brackets: contains trailing whitespace', text, options);

  return 'Brackets';
};

},{"../../utils":94,"underscore":14}],27:[function(require,module,exports){
'use strict';

module.exports = ['form', 'heads'];
module.exports.hasComments = false;

},{}],28:[function(require,module,exports){
'use strict';

var _ = require('underscore');

var utils = require('../../utils');
var GeneratorError = utils.GeneratorError;
var getLoss = require('./get-loss');

module.exports = function (sent, options) {

  if (!sent.isParsed) return {
    output: null,
    loss: undefined
  };

  if (!sent || sent.name !== 'Sentence') throw new GeneratorError('Unable to generate, input not a Sentence', sent, options);

  options = _.defaults(options, sent.options, {});

  sent.index();

  if (!sent.root) throw new GeneratorError('Unable to generate, could not find root');

  // build the tree structure
  var seen = new Set([sent.root]);
  var root = {
    token: sent.root,
    deprel: null,
    deps: []
  };

  var visit = function visit(node) {
    node.token.mapDependents(function (dep) {

      if (seen.has(dep.token)) throw new GeneratorError('Unable to generate, dependency structure non-linear');

      dep.deps = [];
      node.deps.push(dep);
      seen.add(dep.token);
      visit(dep);
    });
  };
  visit(root);

  //console.log(root);

  if (seen.size < sent.size + 1) throw new GeneratorError('Unable to generate, sentence not fully connected');

  // parse the tree into a string
  var output = '';
  var walk = function walk(node) {

    output += '[' + (node.deprel || '_') + ' ';

    node.deps.forEach(function (dep) {
      if (dep.token.indices.absolute < node.token.indices.absolute) walk(dep);
    });

    output += ' ' + node.token.form + ' ';

    node.deps.forEach(function (dep) {
      if (dep.token.indices.absolute > node.token.indices.absolute) walk(dep);
    });

    output += ' ] ';
  };
  root.deps.forEach(function (dep) {
    return walk(dep);
  });

  // clean up the output
  output = output.replace(/\s+/g, ' ').replace(/ \]/g, ']').replace(/\[ /g, '[').replace(/(\w)_(\w)/, '$1 $2').trim();

  // console.log(output);

  return {
    output: output,
    loss: getLoss(sent)
  };
};

},{"../../utils":94,"./get-loss":29,"underscore":14}],29:[function(require,module,exports){
'use strict';

var _ = require('underscore');

var utils = require('../../utils');
var fields = require('./fields');

module.exports = function (sent) {

  var serial = sent.serialize();
  var losses = new Set();

  if (serial.comments.length) losses.add('comments');

  serial.tokens.forEach(function (token) {
    Object.keys(_.omit(token, fields)).forEach(function (field) {
      switch (field) {
        case 'uuid':
        case 'index':
        case 'deps':
          break;

        case 'heads':
          if (token.heads.length > 1) losses.add(field);
          break;

        case 'feats':
        case 'misc':
          if (token[field] && token[field].length) losses.add(field);
          break;

        default:
          if (token[field]) losses.add(field);
      }
    });
  });

  return Array.from(losses);
};

},{"../../utils":94,"./fields":27,"underscore":14}],30:[function(require,module,exports){
'use strict';

module.exports = {

  name: 'Brackets',
  fields: require('./fields'),
  split: require('../default-splitter'),
  detect: require('./detector'),
  parse: require('./parser'),
  generate: require('./generator')

};

},{"../default-splitter":44,"./detector":26,"./fields":27,"./generator":28,"./parser":31}],31:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _ = require('underscore');

var utils = require('../../utils');
var ParserError = utils.ParserError;
var detect = require('./detector');

module.exports = function (text, options) {

  //console.log();
  //console.log(text);

  options = _.defaults(options, {
    allowEmptyString: false
  });

  try {
    detect(text, options);
  } catch (e) {
    if (e instanceof utils.DetectorError) throw new ParserError(e.message);

    throw e;
  }

  var Sentence = function () {
    function Sentence(text, options) {
      _classCallCheck(this, Sentence);

      this.input = text;
      this.options = options;
      this.parent = null;
      this.root = [];
      this.comments = [];
    }

    _createClass(Sentence, [{
      key: 'serialize',
      value: function serialize() {

        this.root.index(0);

        return {
          input: this.input,
          options: this.options,
          comments: this.comments,
          tokens: this.root.serialize([])
        };
      }
    }, {
      key: 'push',
      value: function push(token) {
        this.root = token;
      }
    }]);

    return Sentence;
  }();

  var Token = function () {
    function Token(parent) {
      _classCallCheck(this, Token);

      this.parent = parent;

      this.deprel = null;
      this.before = [];
      this.words = [];
      this.after = [];
    }

    _createClass(Token, [{
      key: 'eachBefore',
      value: function eachBefore(callback) {
        for (var i = 0; i < this.before.length; i++) {
          callback(this.before[i], i);
        }
      }
    }, {
      key: 'eachAfter',
      value: function eachAfter(callback) {
        for (var i = 0; i < this.after.length; i++) {
          callback(this.after[i], i);
        }
      }
    }, {
      key: 'index',
      value: function index(num) {
        this.eachBefore(function (before) {
          num = before.index(num);
        });
        this.num = ++num;
        this.eachAfter(function (after) {
          num = after.index(num);
        });

        return num;
      }
    }, {
      key: 'serialize',
      value: function serialize(tokens) {

        this.eachBefore(function (before) {
          before.serialize(tokens);
        });

        tokens.push({
          form: this.form,
          heads: [{
            index: this.parent.num || 0,
            deprel: this.deprel
          }],
          index: this.num
        });

        this.eachAfter(function (after) {
          after.serialize(tokens);
        });

        return tokens;
      }
    }, {
      key: 'push',
      value: function push(token) {
        if (this.words.length) {
          this.after.push(token);
        } else {
          this.before.push(token);
        }
      }
    }, {
      key: 'addWord',
      value: function addWord(word) {
        if (!word) return;

        if (this.deprel) {
          this.words.push(word);
        } else {
          this.deprel = word;
        }
      }
    }, {
      key: 'form',
      get: function get() {
        return this.words.join('_');
      }
    }]);

    return Token;
  }();

  var sent = new Sentence(text, options),
      parsing = sent,
      parent = null,
      word = '';

  _.each(text, function (char) {
    switch (char) {
      case '[':
        parent = parsing;
        parsing = new Token(parent);
        if (parent && parent.push) parent.push(parsing);
        word = '';
        break;

      case ']':
        if (parsing.addWord) parsing.addWord(word);
        parsing = parsing.parent;
        parent = parsing.parent;
        word = '';
        break;

      case ' ':
        if (parsing.addWord) parsing.addWord(word);
        word = '';
        break;

      default:
        word += char;
        break;
    }
  });

  //console.log(sent.serialize())
  return sent.serialize();
};

},{"../../utils":94,"./detector":26,"underscore":14}],32:[function(require,module,exports){
'use strict';

var _ = require('underscore');

var utils = require('../../utils');
var DetectorError = utils.DetectorError;

module.exports = function (text, options) {

  options = _.defaults(options, {
    allowEmptyString: false,
    allowTrailingWhitespace: true,
    allowLeadingWhitespace: true
  });

  if (!text && !options.allowEmptyString) throw new DetectorError('Illegal CG3: empty string', text, options);

  if (utils.isJSONSerializable(text)) throw new DetectorError('Illegal CG3: JSON object', text, options);

  // internal stuff
  var parsing = null;

  // iterate over the lines and check each one
  text.split(/\n/).forEach(function (line) {

    if (utils.re.whiteline.test(line)) {

      if (parsing === null) {

        if (!options.allowLeadingWhitespace) throw new DetectorError('Illegal CG3: contains leading whitespace', text, options);
      } else {

        if (parsing !== 'token-body' || !options.allowTrailingWhitespace) throw new DetectorError('Illegal CG3: contains trailing whitespace', text, options);
      }

      parsing = 'whitespace';
    } else if (utils.re.comment.test(line)) {

      if (parsing === 'token-start' || parsing === 'token-body') throw new DetectorError('Illegal CG3: invalid sequence ' + parsing + '=>comment', text, options);

      parsing = 'comment';
    } else if (utils.re.cg3TokenStart.test(line)) {

      if (parsing === 'token-start') throw new DetectorError('Illegal CG3: invalid sequence ' + parsing + '=>token-start', text, options);

      parsing = 'token-start';
    } else if (utils.re.cg3TokenContent.test(line)) {

      if (parsing === 'comment' || parsing === 'whitespace') throw new DetectorError('Illegal CG3: invalid sequence ' + parsing + '=>token-body', text, options);

      parsing = 'token-body';
    } else {

      throw new DetectorError('Illegal CG3: unmatched line', text, options);
    }
  });

  return 'CG3';
};

},{"../../utils":94,"underscore":14}],33:[function(require,module,exports){
'use strict';

module.exports = ['semicolon', 'index', 'form', 'lemma', 'heads', 'xpostag', 'other', 'analyses'];
module.exports.hasComments = true;

},{}],34:[function(require,module,exports){
'use strict';

var _ = require('underscore');

var utils = require('../../utils');
var GeneratorError = utils.GeneratorError;
var getLoss = require('./get-loss');

module.exports = function (sent, options) {

  if (!sent.isParsed) return {
    output: null,
    loss: undefined
  };

  if (!sent || sent.name !== 'Sentence') throw new GeneratorError('Unable to generate, input not a Sentence', sent, options);

  options = _.defaults(options, sent.options, {
    omitIndices: false,
    allowMissingLemma: true
  });

  sent.index();

  var lines = [];
  sent.comments.forEach(function (comment) {
    return lines.push('# ' + comment.body);
  });
  sent.tokens.forEach(function (token) {

    var isSet = function isSet(field) {
      return field && field !== utils.fallback ? field : null;
    };

    var push = function push(token, indent) {

      if (!token.lemma && !options.allowMissingLemma) throw new GeneratorError('Unable to generate, token has no lemma', sent, options);

      indent = (token.semicolon ? ';' : '') + '\t'.repeat(indent);

      var head = token.heads.first;
      var dependency = options.omitIndices ? null : '#' + token.indices.cg3 + '->' + (head == undefined ? '' : head.token.indices.cg3);

      var line = ['"' + (isSet(token.lemma) || isSet(token.form) || utils.fallback) + '"'].concat(isSet(token.xpostag) || isSet(token.upostag)).concat((token._feats || []).join(' ')).concat((token._misc || []).join(' ')).concat(head && isSet(head.deprel) ? '@' + head.deprel : null).concat(dependency);

      line = indent + line.filter(utils.thin).join(' ');
      lines.push(line);
    };

    lines.push('"<' + (token.form || utils.fallback) + '>"');

    if (token._analyses && token._analyses.length) {

      token._analyses.forEach(function (analysis) {
        analysis.subTokens.forEach(function (subToken, i) {

          push(subToken, i + 1);
        });
      });
    } else {

      push(token, 1);
    }
  });

  return {
    output: lines.join('\n'),
    loss: getLoss(sent)
  };
};

},{"../../utils":94,"./get-loss":35,"underscore":14}],35:[function(require,module,exports){
'use strict';

var _ = require('underscore');

var utils = require('../../utils');
var fields = require('./fields');

module.exports = function (sent) {

  var serial = sent.serialize();
  var losses = new Set();

  var tokenCalcLoss = function tokenCalcLoss(token) {
    if (token.heads && token.heads.length > 1) losses.add('enhanced dependencies');

    Object.keys(_.omit(token, fields)).forEach(function (field) {
      switch (field) {
        case 'uuid':
        case 'index':
        case 'deps':
        case 'feats':
        case 'misc':
          break;

        case 'upostag':
          if (token.xpostag && token.upostag) losses.add(field);
          break;

        case 'isEmpty':
          if (token.isEmpty) losses.add(field);
          break;

        default:
          losses.add(field);
      }
    });
  };

  serial.tokens.map(function (token) {

    tokenCalcLoss(token);

    (token.analyses || []).forEach(function (analysis) {

      var analysisKeys = Object.keys(analysis);
      if (analysisKeys.length > 1 || analysisKeys[0] !== 'subTokens') {
        losses.add('analyses');
      } else {
        analysis.subTokens.map(function (subToken) {

          tokenCalcLoss(subToken);

          if (subToken.form != undefined) losses.add('form');
        });
      }
    });
  });

  return Array.from(losses);
};

},{"../../utils":94,"./fields":33,"underscore":14}],36:[function(require,module,exports){
'use strict';

module.exports = {

  name: 'CG3',
  fields: require('./fields'),
  split: require('../default-splitter'),
  detect: require('./detector'),
  parse: require('./parser'),
  generate: require('./generator')

};

},{"../default-splitter":44,"./detector":32,"./fields":33,"./generator":34,"./parser":37}],37:[function(require,module,exports){
'use strict';

var _ = require('underscore');

var utils = require('../../utils');
var ParserError = utils.ParserError;
var detect = require('./detector');

module.exports = function (text, options) {

  function getIndentNum(str, options) {

    var count = function count(str, reg) {
      return str.match(reg).length;
    };

    if (options.indentString) {

      var regex = options.indentString instanceof RegExp ? options.indentString : new RegExp(options.indentString, 'g');

      return count(str, regex);
    } else if (options.useTabIndent) {

      return count(str, /\t/g);
    } else if (options.spacesPerTab) {

      var _regex = new RegExp(' {' + options.spacesPerTab + '}', 'g');
      return count(str, _regex);
    } else if (options.equalizeWhitespace) {

      return count(str, /\s/g);
    } else {
      throw new ParserError('can\'t get the indent number, insufficient options set', text, options);
    }
  }

  options = _.defaults(options, {
    allowEmptyString: false,
    indentString: null,
    useTabIndent: false,
    spacesPerTab: null,
    equalizeWhitespace: true,
    coerceMultipleSpacesAfterSemicolonToTab: true,
    allowMissingIndices: true
  });

  try {
    detect(text, options);
  } catch (e) {
    if (e instanceof utils.DetectorError) throw new ParserError(e.message);

    throw e;
  }

  //console.log();
  //console.log(text);

  // "tokenize" into chunks
  var i = 0,
      chunks = [];
  while (i < text.length) {

    var remains = text.slice(i),
        whiteline = remains.match(utils.re.whiteline),
        comment = remains.match(utils.re.comment),
        tokenStart = remains.match(utils.re.cg3TokenStart),
        tokenContent = remains.match(utils.re.cg3TokenContent);

    if (whiteline) {

      i += whiteline[0].length;
    } else if (comment) {

      chunks.push({
        type: 'comment',
        body: comment[2]
      });
      i += comment[1].length;
    } else if (tokenStart) {

      chunks.push({
        type: 'form',
        form: tokenStart[1]
      });
      i += tokenStart[0].length;

      while (utils.re.whitespace.test(text[i]) && text[i] !== '\n') {
        i++;
      }i++;
    } else if (tokenContent) {
      (function () {

        // some real BS right here, overfitting my data hard
        var indent = options.coerceMultipleSpacesAfterSemicolonToTab ? !!tokenContent[1] ? tokenContent[2].replace(/ +/, '\t') : tokenContent[2] : tokenContent[2];

        var chunk = {
          type: 'content',
          semicolon: !!tokenContent[1],
          indent: getIndentNum(indent, options),
          lemma: tokenContent[3],
          misc: []
        };

        var deprel = tokenContent[5].match(utils.re.cg3Deprel);

        tokenContent[5].split(/\s+/).filter(utils.thin).forEach(function (subChunk) {

          var dependency = subChunk.match(utils.re.cg3Dependency),
              head = subChunk.match(utils.re.cg3Head),
              index = subChunk.match(utils.re.cg3Index),
              misc = subChunk.match(utils.re.cg3Other);

          if (dependency && (head || index)) {

            if (head) {

              if (chunk.heads) throw new ParserError('unexpected subChunk, heads already set', text, options);

              head = parseInt(head[1]);

              if (!isNaN(head)) chunk.heads = [{
                index: head,
                deprel: deprel && deprel[1] ? deprel[1] : null
              }];
            } else if (index) {

              if (chunk.index) throw new ParserError('unexpected subChunk, index already set', text, options);

              chunk.index = parseInt(index[1]);
            }
          } else if (misc) {

            if (!misc[0].startsWith('@')) chunk.misc.push(misc[0]);
          }
        });

        if (deprel && deprel[1] && !chunk.heads) chunk.misc.push('@' + deprel[1]);

        chunks.push(chunk);
        i += tokenContent[0].length;
      })();
    } else {
      throw new ParserError('unable to match remains: ' + remains, text, options);
    }
  }

  //console.log(chunks);

  // turn the chunks into tokens and comments
  var tokens = [];
  var comments = [];
  var expecting = ['comment', 'form'];
  var token = null;
  var analysis = null;
  var missingIndices = false;

  chunks.forEach(function (chunk) {

    if (expecting.indexOf(chunk.type) === -1) throw new ParserError('expecting ' + expecting.join('|') + ', got ' + chunk.type, text, options);

    if (chunk.type === 'comment') {

      comments.push(chunk.body);
      expecting = ['comment', 'form'];
      token = null;
      analysis = null;
    } else if (chunk.type === 'form') {

      if (analysis) token.analyses.push(analysis);

      if (token) {
        if (token.analyses.length === 1 && token.analyses[0].subTokens.length === 1) token = _.omit(_.extend(token, token.analyses[0].subTokens[0]), 'analyses');

        tokens.push(_.omit(token, 'currentIndent'));
      }

      token = {
        form: chunk.form,
        currentIndent: 0,
        analyses: []
      };
      analysis = null;

      expecting = ['content'];
    } else if (chunk.type === 'content') {

      if (!token) throw new ParserError('cannot parse content chunk without a token', text, options);

      if (chunk.indent > token.currentIndent + 1) throw new ParserError('invalid indent change (' + token.currentIndent + '=>' + chunk.indent + ')', text, options);

      if (chunk.indent === 1) {
        if (analysis) token.analyses.push(analysis);

        if (chunk.index === undefined) {
          if (!options.allowMissingIndices) throw new ParserError('cannot parse token without index', text, options);

          missingIndices = true;
        } else {
          if (missingIndices) throw new ParserError('cannot parse partially indexed CG3', text, options);
        }

        analysis = {
          subTokens: [{
            semicolon: chunk.semicolon,
            lemma: chunk.lemma || null,
            heads: chunk.heads || null,
            index: chunk.index || null,
            xpostag: chunk.misc.shift() || null,
            misc: chunk.misc || null
          }]
        };
      } else {
        if (!analysis) throw new ParserError('cannot parse content chunk without an analysis', text, options);

        if (chunk.index === undefined && !options.allowMissingIndices) throw new ParserError('cannot parse token without index', text, options);

        analysis.subTokens.push({
          semicolon: chunk.semicolon,
          lemma: chunk.lemma || null,
          heads: chunk.heads || null,
          index: chunk.index || null,
          xpostag: chunk.misc.shift() || null,
          misc: chunk.misc || null
        });
      }

      token.currentIndent = chunk.indent;
      expecting = ['content', 'form'];
    } else {
      throw new ParserError('unrecognized chunk type: ' + chunk.type, text, options);
    }
  });

  if (analysis) token.analyses.push(analysis);

  if (token) {
    if (token.analyses.length === 1 && token.analyses[0].subTokens.length === 1) token = _.omit(_.extend(token, token.analyses[0].subTokens[0]), 'analyses');

    tokens.push(_.omit(token, 'currentIndent'));
  }

  if (missingIndices) {

    var index = 0;
    tokens.forEach(function (token) {
      if (token.analyses) {
        token.analyses.forEach(function (analysis) {
          analysis.subTokens.forEach(function (subToken) {
            subToken.index = ++index;
          });
        });
      } else {
        token.index = ++index;
      }
    });
  }

  //console.log(comments);
  //console.log(tokens);

  return {
    input: text,
    options: options,
    comments: comments,
    tokens: tokens
  };
};

},{"../../utils":94,"./detector":32,"underscore":14}],38:[function(require,module,exports){
'use strict';

var _ = require('underscore');

var utils = require('../../utils');
var DetectorError = utils.DetectorError;

module.exports = function (text, options) {

  options = _.defaults(options, {
    allowEmptyString: false,
    requireTenParams: false,
    allowTrailingWhitespace: true
  });

  if (!text && !options.allowEmptyString) throw new DetectorError('Illegal CoNLL-U: empty string', text, options);

  if (utils.isJSONSerializable(text)) throw new DetectorError('Illegal CoNLL-U: JSON object', text, options);

  // be more or less strict about the fields we require being set
  var tokenLine = options.requireTenParams ? utils.re.conlluTokenLineTenParams : utils.re.conlluTokenLine;

  // internal stuff
  var doneComments = false;
  var doneContent = false;

  // iterate over the lines and check each one
  var lines = text.split(/\n/);
  lines.forEach(function (line, i) {

    if (utils.re.comment.test(line)) {

      // can only have comments at the beginning
      if (doneComments) throw new DetectorError('Illegal CoNLL-U: misplaced comment', text, options);
    } else {

      // done parsing comments
      doneComments = true;

      if (line) {
        if (!tokenLine.test(line)) throw new DetectorError('Illegal CoNLL-U: unmatched line', text, options);

        if (doneContent) throw new DetectorError('Illegal CoNLL-U: misplaced whitespace', text, options);
      } else {

        // only allow empty lines after we've looked at all the content
        if (!options.allowTrailingWhitespace) throw new DetectorError('Illegal CoNLL-U: contains trailing whitespace', text, options);

        doneContent = true;
      }
    }
  });

  return 'CoNLL-U';
};

},{"../../utils":94,"underscore":14}],39:[function(require,module,exports){
'use strict';

module.exports = ['isEmpty', 'index', 'form', 'lemma', 'upostag', 'xpostag', 'feats', 'heads', 'misc', 'subTokens'];
module.exports.hasComments = true;

},{}],40:[function(require,module,exports){
'use strict';

var _ = require('underscore');

var utils = require('../../utils');
var GeneratorError = utils.GeneratorError;
var getLoss = require('./get-loss');

module.exports = function (sent, options) {

  if (!sent.isParsed) return {
    output: null,
    loss: undefined
  };

  if (!sent || sent.name !== 'Sentence') throw new GeneratorError('Unable to generate, input not a Sentence', sent, options);

  options = _.defaults(options, sent.options, {});

  sent.index();

  var lines = [];
  sent.comments.forEach(function (comment) {
    lines.push('# ' + comment.body);
  });
  sent.tokens.forEach(function (token) {

    var toString = function toString(token) {

      var head = !token.isEmpty && token.heads.first;

      return [token.indices.conllu, token.form || utils.fallback, token.lemma || utils.fallback, token.upostag || utils.fallback, token.xpostag || utils.fallback, token.feats || utils.fallback, head ? head.token.indices.conllu : utils.fallback, head && head.deprel ? head.deprel : utils.fallback, token._getDeps('CoNLL-U').join('|') || utils.fallback, token.misc || utils.fallback].join('\t');
    };

    lines.push(toString(token));
    token.subTokens.forEach(function (subToken) {
      lines.push(toString(subToken));
    });
  });

  return {
    output: lines.join('\n'),
    loss: getLoss(sent)
  };
};

},{"../../utils":94,"./get-loss":41,"underscore":14}],41:[function(require,module,exports){
'use strict';

var _ = require('underscore');

var utils = require('../../utils');
var fields = require('./fields');

module.exports = function (sent) {

  var serial = sent.serialize();
  var losses = new Set();

  var tokenCalcLoss = function tokenCalcLoss(token) {

    if (token.heads.length > 1 && !sent.options.enhanced) losses.add('enhanced dependencies');

    Object.keys(_.omit(token, fields)).forEach(function (field) {
      switch (field) {
        case 'uuid':
        case 'index':
        case 'other':
          break;

        case 'analyses':
          if (token.analyses.length > 1) {
            losses.add('analyses');
          } else {

            var analysis = token.analyses[0],
                analysisKeys = Object.keys(analysis);

            if (analysisKeys.length > 1 || analysisKeys[0] !== 'subTokens') {
              losses.add('analyses');
            } else {
              analysis.subTokens.map(tokenCalcLoss);
            }
          }
          break;

        default:
          losses.add(field);
      }
    });
  };

  serial.tokens.map(tokenCalcLoss);

  return Array.from(losses);
};

},{"../../utils":94,"./fields":39,"underscore":14}],42:[function(require,module,exports){
'use strict';

module.exports = {

  name: 'CoNLL-U',
  fields: require('./fields'),
  split: require('../default-splitter'),
  detect: require('./detector'),
  parse: require('./parser'),
  generate: require('./generator')

};

/*
{
  semicolon: Boolean || undefined,
  isEmpty: Boolean || undefined,
  index: String || undefined,
  form: String || null || undefined,
  lemma: String || null || undefined,
  upostag: String || null || undefined,
  xpostag: String || null || undefined,
  feats: String || null || undefined,
  head: String || null || undefined,
  deprel: String || null || undefined,
  deps: String || null || undefined,
  other: Array || undefined,
  analyses: [
    subTokens: [
      semicolon: Boolean || undefined,
      isEmpty: Boolean || undefined,
      index: String || undefined,
      form: String || null || undefined,
      lemma: String || null || undefined,
      upostag: String || null || undefined,
      xpostag: String || null || undefined,
      feats: String || null || undefined,
      head: String || null || undefined,
      deprel: String || null || undefined,
      deps: String || null || undefined,
      other: Array || undefined,
    ]
  ]
}
*/

},{"../default-splitter":44,"./detector":38,"./fields":39,"./generator":40,"./parser":43}],43:[function(require,module,exports){
'use strict';

var _ = require('underscore');

var utils = require('../../utils');
var ParserError = utils.ParserError;
var detect = require('./detector');

module.exports = function (text, options) {

  function assertNext(supStr, subStr) {

    function parseIndex(str) {

      var match = (str || '').match(utils.re.conlluEmptyIndex);
      if (!match) return null;

      return match[2] ? {
        major: parseInt(match[1]),
        minor: parseInt(match[2])
      } : {
        major: parseInt(match[1]),
        minor: null
      };
    }

    if (supStr === null) return;

    var sup = parseIndex(supStr),
        sub = parseIndex(subStr);

    if (sub.minor === null) {
      if (sub.major - sup.major !== 1) throw new ParserError('unexpected token index (at: ' + sup.major + (sup.minor === null ? '' : '.' + sup.minor) + ', got: ' + sup.major + (sup.minor === null ? '' : '.' + sup.minor) + ')');
    } else if (sup.minor === null) {
      if (sub.minor !== 1) throw new ParserError('unexpected token index (at: ' + sup.major + (sup.minor === null ? '' : '.' + sup.minor) + ', got: ' + sup.major + (sup.minor === null ? '' : '.' + sup.minor) + ')');
    } else {
      if (sub.minor - sup.minor !== 1) throw new ParserError('unexpected token index (at: ' + sup.major + (sup.minor === null ? '' : '.' + sup.minor) + ', got: ' + sup.major + (sup.minor === null ? '' : '.' + sup.minor) + ')');
    }
  }

  options = _.defaults(options, {
    allowEmptyString: false,
    requireTenParams: false,
    allowWhiteLines: true,
    enhanced: false
  });

  try {
    detect(text, options);
  } catch (e) {
    if (e instanceof utils.DetectorError) throw new ParserError(e.message);

    throw e;
  }

  //console.log();
  //console.log(text);

  // "tokenize" into chunks
  var i = 0,
      chunks = [];
  var lines = text.split('\n');
  var tokenRegex = options.requireTenParams ? utils.re.conlluTokenLineTenParams : utils.re.conlluTokenLine;

  lines.forEach(function (line) {
    var whiteline = line.match(utils.re.whiteline),
        comment = line.match(utils.re.comment),
        tokenLine = line.match(tokenRegex);

    if (whiteline) {} else if (comment) {

      chunks.push({
        type: 'comment',
        body: comment[2]
      });
    } else if (tokenLine) {

      var token = void 0;

      var fields = tokenLine[7];
      if (/(\t|[ ]{2,})/g.test(fields)) {

        fields = fields.replace(/[ ]{2,}/g, '\t').split(/\t/g).filter(utils.thin);
      } else {

        fields = fields.split(/[\t ]+/g).filter(utils.thin);
      }

      if (tokenLine[4]) {

        token = {
          type: 'super-token',
          index: tokenLine[1],
          startIndex: tokenLine[2],
          stopIndex: tokenLine[5],
          form: utils.re.fallback.test(fields[0]) ? null : fields[0],
          misc: utils.re.fallback.test(fields[8]) ? null : fields[8].split('|')
        };
      } else {
        var getHeads = function getHeads(isEmpty, head, deprel, deps) {

          head = utils.re.fallback.test(head) ? null : head;
          deprel = utils.re.fallback.test(deprel) ? null : deprel;
          deps = utils.re.fallback.test(deps) ? null : deps;

          var heads = [];
          var seen = new Set();

          if (head && !isEmpty) {
            heads.push({
              index: head,
              deprel: deprel || null
            });
            seen.add(head);
          }

          if (deps) {
            deps.split('|').forEach(function (dep) {

              dep = dep.split(':');

              if (!seen.has(dep[0])) heads.push({
                index: dep[0],
                deprel: dep[1] || null
              });

              seen.add(dep[0]);
            });
          } else if (isEmpty) {
            // FIXME: Add this as a "strict mode" requirement?
            //throw new ParserError(`Missing "deps" for empty node: ${line}`, text, options);
          }

          return heads.length ? heads : null;
        };

        var isEmpty = !!tokenLine[3];
        if (isEmpty) {
          options.enhanced = true;
        }

        token = {
          type: 'token',
          index: tokenLine[1],
          isEmpty: isEmpty,
          form: !fields[0] || utils.re.fallback.test(fields[0]) ? null : fields[0],
          lemma: !fields[1] || utils.re.fallback.test(fields[1]) ? null : fields[1],
          upostag: !fields[2] || utils.re.fallback.test(fields[2]) ? null : fields[2],
          xpostag: !fields[3] || utils.re.fallback.test(fields[3]) ? null : fields[3],
          feats: !fields[4] || utils.re.fallback.test(fields[4]) ? null : fields[4].split('|'),
          heads: getHeads(isEmpty, fields[5], fields[6], fields[7]),
          misc: !fields[8] || utils.re.fallback.test(fields[8]) ? null : fields[8].split('|')
        };
      }
      chunks.push(token);
    } else {
      throw new ParserError('unable to match line: ' + line, text, options);
    }
  });

  //console.log(chunks);

  var tokens = [];
  var comments = [];
  var expecting = ['comment', 'super-token', 'token'];
  var superToken = null;

  chunks.filter(utils.thin).forEach(function (chunk) {

    if (expecting.indexOf(chunk.type) === -1) throw new ParserError('expecting ' + expecting.join('|') + ', got ' + chunk.type, text, options);

    if (chunk.type === 'comment') {

      comments.push(chunk.body);
      expecting = ['comment', 'super-token', 'token'];
    } else if (chunk.type === 'super-token') {

      superToken = {
        form: chunk.form,
        misc: chunk.misc,
        analyses: [{
          subTokens: []
        }],
        index: chunk.index,
        currentIndex: null,
        stopIndex: chunk.stopIndex
      };

      expecting = ['token'];
    } else if (chunk.type === 'token') {

      if (superToken) {

        assertNext(superToken.currentIndex, chunk.index);
        superToken.currentIndex = chunk.index;

        superToken.analyses[0].subTokens.push(_.omit(chunk, ['type']));

        if (superToken.currentIndex === superToken.stopIndex) {

          tokens.push(_.omit(superToken, ['currentIndex', 'stopIndex']));
          superToken = null;
          expecting = ['super-token', 'token'];
        } else {
          expecting = ['token'];
        }
      } else {

        tokens.push(_.omit(chunk, ['type']));
        expecting = ['super-token', 'token'];
      }
    } else {
      throw new ParserError('unrecognized chunk type: ' + chunk.type, text, options);
    }
  });

  //console.log(comments);
  //console.log(tokens);

  return {
    input: text,
    options: options,
    comments: comments,
    tokens: tokens
  };
};

},{"../../utils":94,"./detector":38,"underscore":14}],44:[function(require,module,exports){
'use strict';

var _ = require('underscore');
var utils = require('../utils');

module.exports = function (text) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};


  options = _.defaults(options, {
    trimChunks: true
  });

  return text.split(utils.re.multiNewlines).map(function (chunk) {
    if (options.trimChunks) {
      return chunk.trim();
    } else {
      return chunk;
    }
  }).filter(utils.thin);
};

},{"../utils":94,"underscore":14}],45:[function(require,module,exports){
'use strict';

/**
 * Supported output formats:
 *  * ApertiumStream (coming soon!)
 *  * Brackets
 *  * CG3
 *  * CoNLL-U
 *  * NotatrixSerial
 *  * Params
 *  * Plain text
 *  * SDParse
 */

module.exports = {

  'apertium stream': require('./apertium-stream'),
  apertiumStream: require('./apertium-stream'),
  Brackets: require('./brackets'),
  brackets: require('./brackets'),
  CG3: require('./cg3'),
  cg3: require('./cg3'),
  'CoNLL-U': require('./conllu'),
  conllu: require('./conllu'),
  'notatrix serial': require('./notatrix-serial'),
  notatrixSerial: require('./notatrix-serial'),
  Params: require('./params'),
  params: require('./params'),
  'plain text': require('./plain-text'),
  plainText: require('./plain-text'),
  SD: require('./sd'),
  sd: require('./sd')

};

},{"./apertium-stream":23,"./brackets":30,"./cg3":36,"./conllu":42,"./notatrix-serial":50,"./params":57,"./plain-text":64,"./sd":71}],46:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _ = require('underscore');

var utils = require('../../utils');
var DetectorError = utils.DetectorError;

module.exports = function (obj, options) {

  function restrict(obj, fields) {
    var allowUndefined = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    if (obj === undefined) throw new DetectorError('Illegal notatrix serial: missing field', obj, options);

    if (_.omit(obj, Object.keys(fields)).length) throw new DetectorError('Illegal notatrix serial: unexpected field', obj, options);

    _.each(fields, function (fieldType, fieldName) {

      var value = obj[fieldName];

      switch (fieldType) {
        case 'number':
          if (value !== undefined || !allowUndefined) if (isNaN(parseFloat(value))) throw new DetectorError('Illegal notatrix serial: could not parse ' + value + ' as float', obj, options);
          break;

        case 'string':
          if (value !== undefined || !allowUndefined) if (typeof value !== 'string') throw new DetectorError('Illegal notatrix serial: expected \'string\', got ' + (typeof value === 'undefined' ? 'undefined' : _typeof(value)), obj, options);
          break;

        case 'string*':
          if (value !== undefined || !allowUndefined) if (value !== null && typeof value !== 'string') throw new DetectorError('Illegal notatrix serial: expected \'string\', got ' + (typeof value === 'undefined' ? 'undefined' : _typeof(value)), obj, options);
          break;

        case 'object':
          // pass
          break;

        case 'array':
          if (value != undefined || !allowUndefined) if (!Array.isArray(value)) throw new DetectorError('Illegal notatrix serial: expected Array, got ' + (typeof value === 'undefined' ? 'undefined' : _typeof(value)), obj, options);
          break;
      }
    });
  }

  options = _.defaults(options, {
    allowZeroTokens: true,
    allowZeroFields: true
  });

  if (!utils.isJSONSerializable(obj)) throw new DetectorError('Illegal notatrix serial: not JSON object', obj, options);

  obj = typeof obj === 'string' ? JSON.parse(obj) : obj;

  restrict(obj, utils.nxSentenceFields);
  _.each(obj.comments, function (comment) {
    if (typeof comment !== 'string') throw new DetectorError('Illegal notatrix serial: comments should be strings', obj, options);
  });
  _.each(obj.tokens, function (token) {
    restrict(token, utils.nxSentenceTokensFields, true);
  });
  if (obj.tokens.length === 0 && !options.allowZeroTokens) throw new DetectorError('Illegal notatrix serial: cannot have empty token list', obj, options);

  _.each(obj.tokens, function (token) {
    if (Object.keys(token).length === 0 && !options.allowZeroFields) throw new DetectorError('Illegal notatrix serial: cannot have token without fields', obj, options);

    if (token.analyses) _.each(token.analyses, function (analysis) {

      var analysisKeys = Object.keys(analysis);
      if (analysisKeys.length !== 1 || analysisKeys[0] !== 'subTokens') throw new DetectorError('Illegal notatrix serial: got unexpected analyses field', obj, options);

      _.each(analysis.subTokens, function (subToken) {
        restrict(subToken, utils.nxSentenceTokensFields, true);
        if (subToken.analyses !== undefined) throw new DetectorError('Illegal notatrix serial: subTokens can only have one analysis', obj, options);
      });
    });
  });

  return 'notatrix serial';
};

},{"../../utils":94,"underscore":14}],47:[function(require,module,exports){
"use strict";

module.exports = [];
module.exports.hasComments = true;

},{}],48:[function(require,module,exports){
'use strict';

var _ = require('underscore');

var utils = require('../../utils');
var GeneratorError = utils.GeneratorError;
var getLoss = require('./get-loss');

module.exports = function (sent, options) {

  if (!sent.isParsed) return {
    output: null,
    loss: undefined
  };

  if (!sent || sent.name !== 'Sentence') throw new GeneratorError('Unable to generate, input not a Sentence', sent, options);

  options = _.defaults(options, sent.options, {});

  sent.index();

  return {
    output: sent.serialize(),
    loss: getLoss(sent)
  };
};

},{"../../utils":94,"./get-loss":49,"underscore":14}],49:[function(require,module,exports){
'use strict';

var _ = require('underscore');

var utils = require('../../utils');
var Loss = utils.Loss;
var fields = require('./fields');

module.exports = function (sent) {
  // do nothing, can't lose info on this one
  return [];
};

},{"../../utils":94,"./fields":47,"underscore":14}],50:[function(require,module,exports){
'use strict';

module.exports = {

  name: 'notatrix serial',
  fields: require('./fields'),
  split: require('./splitter'),
  detect: require('./detector'),
  parse: require('./parser'),
  generate: require('./generator')

};

/*
INPUT:
{
  input: String,
  options: Object,
  comments: [
    String
  ],
  tokens: [
    (
      // #1 (default)
      {
        isEmpty: Boolean || undefined,
        index: String || undefined,
        form: String || null || undefined,
        lemma: String || null || undefined,
        upostag: String || null || undefined,
        xpostag: String || null || undefined,
        feats: String || null || undefined,
        head: (
          String
          ||
          null
          ||
          undefined
          ||
          {
            index: String,
            type: String || null,
          }
        ),
        deprel: String || null || undefined,
        deps: (
          String
          ||
          null
          ||
          undefined
          ||
          {
            index: String,
            type: String || null,
          }
        ),
        misc: String || null || undefined,
      }
      ||
      // #2 (CoNLL-U superToken)
      {
        index: String,
        form: String || null,
        misc: String || null,
        subTokens: [
          <#1>
        ]
      }
      ||
      // #3 (CG3)
      {
        form: String || null,
        analyses: [
          [
            semicolon: Boolean,
            lemma: String || null,
            head: String || null,
            index: String || null,
            deprel: String || null,
            xpostag: String || null,
            other: [
              String
            ]
          ]
        ]
      }
      ||
      // #4 (notatrix serial)
      {

      }
    )
  ]
}


OUTPUT:
{
  input: String,
  options: 'plain object',
  comments: [
    {
      type: String,
      body: String,
      value: <any>
    }
  ],
*/

},{"./detector":46,"./fields":47,"./generator":48,"./parser":51,"./splitter":52}],51:[function(require,module,exports){
'use strict';

var _ = require('underscore');

var utils = require('../../utils');
var ParserError = utils.ParserError;
var detect = require('./detector');

module.exports = function (obj, options) {

  try {
    detect(obj, options);
  } catch (e) {
    if (e instanceof utils.DetectorError) throw new ParserError(e.message);

    throw e;
  }

  return obj;
};

},{"../../utils":94,"./detector":46,"underscore":14}],52:[function(require,module,exports){
'use strict';

var utils = require('../../utils');
var SplitterError = utils.SplitterError;

module.exports = function (text, options) {
  throw new SplitterError('Can\'t split notatrix serial', text, options);
};

},{"../../utils":94}],53:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _ = require('underscore');

var utils = require('../../utils');
var DetectorError = utils.DetectorError;

module.exports = function (obj, options) {

  options = _.defaults(options, {
    allowEmptyList: false,
    allowTrailingWhitespace: true,
    allowLeadingWhitespace: true
  });

  if (!utils.isJSONSerializable(obj)) throw new DetectorError('Illegal Params: not JSON object', obj, options);

  obj = typeof obj === 'string' ? JSON.parse(obj) : obj;

  if (Array.isArray(obj)) {

    if (!obj.length && !options.allowEmptyList) throw new DetectorError('Illegal Params: contains no tokens', obj, options);

    obj.forEach(function (obj) {

      var omitted = Object.keys(_.omit(obj, utils.fields));
      if (omitted.length) throw new DetectorError('Illegal Params: contains illegal keys (' + omitted.join(', ') + ')', obj, options);

      var picked = Object.keys(_.pick(obj, utils.fields));
      if (!picked.length) throw new DetectorError('Illegal Params: missing required keys', obj, options);
    });
  } else {

    throw new DetectorError('Illegal Params: expected array of parameters, got ' + (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)), obj, options);
  }

  return 'Params';
};

},{"../../utils":94,"underscore":14}],54:[function(require,module,exports){
'use strict';

module.exports = ['isEmpty', 'index', 'form', 'lemma', 'upostag', 'xpostag', 'feats', 'head', 'deprel', 'deps', 'misc'];
module.exports.hasComments = false;

},{}],55:[function(require,module,exports){
'use strict';

var _ = require('underscore');

var utils = require('../../utils');
var GeneratorError = utils.GeneratorError;
var getLoss = require('./get-loss');

module.exports = function (sent, options) {

  if (!sent.isParsed) return {
    output: null,
    loss: undefined
  };

  if (!sent || sent.name !== 'Sentence') throw new GeneratorError('Unable to generate, input not a Sentence', sent, options);

  options = _.defaults(options, sent.options, {});

  sent.index();

  var output = sent.tokens.map(function (token) {

    if (token.analysis) throw new GeneratorError('Unable to generate, contains ambiguous analyses or multiword tokens');

    var params = _.pick(token, utils.fields);
    params.head = token.getHead();

    return _.pick(params, function (value) {
      return value != undefined;
    });
  });

  return {
    output: output,
    loss: getLoss(sent)
  };
};

},{"../../utils":94,"./get-loss":56,"underscore":14}],56:[function(require,module,exports){
'use strict';

var _ = require('underscore');

var utils = require('../../utils');
var fields = require('./fields');

module.exports = function (sent) {

  var serial = sent.serialize();
  var losses = new Set();

  if (serial.comments.length) losses.add('comments');

  serial.tokens.forEach(function (token) {
    Object.keys(_.omit(token, fields)).forEach(function (field) {
      switch (field) {
        case 'uuid':
        case 'index':
          break;

        case 'heads':
          if (token.heads.length > 1) losses.add('enhanced dependencies');
          break;

        default:
          losses.add(field);
      }
    });
  });

  return Array.from(losses);
};

},{"../../utils":94,"./fields":54,"underscore":14}],57:[function(require,module,exports){
'use strict';

module.exports = {

  name: 'Params',
  fields: require('./fields'),
  split: require('./splitter'),
  detect: require('./detector'),
  parse: require('./parser'),
  generate: require('./generator')

};

},{"./detector":53,"./fields":54,"./generator":55,"./parser":58,"./splitter":59}],58:[function(require,module,exports){
'use strict';

var _ = require('underscore');

var utils = require('../../utils');
var ParserError = utils.ParserError;
var detect = require('./detector');

module.exports = function (obj, options) {

  try {
    detect(obj, options);
  } catch (e) {
    if (e instanceof utils.DetectorError) throw new ParserError(e.message);

    throw e;
  }

  return {
    input: JSON.stringify(obj),
    options: options,
    comments: [],
    tokens: obj.map(function (token, i) {
      token.index = '' + i;
      return token;
    })
  };
};

},{"../../utils":94,"./detector":53,"underscore":14}],59:[function(require,module,exports){
'use strict';

var utils = require('../../utils');
var SplitterError = utils.SplitterError;

module.exports = function (text, options) {
  throw new SplitterError('Can\'t split Params', text, options);
};

},{"../../utils":94}],60:[function(require,module,exports){
'use strict';

var _ = require('underscore');

var utils = require('../../utils');
var DetectorError = utils.DetectorError;

module.exports = function (text, options) {

  options = _.defaults(options, {
    allowEmptyString: true,
    allowNewlines: false,
    bracketsAllowanceTreshold: 0.2 // set to <0 or >1 to avoid
  });

  /*
  if (!text && !options.allowEmptyString)
    throw new DetectorError(`Illegal plain text: empty string`, text, options);
    */

  if (utils.isJSONSerializable(text)) throw new DetectorError('Illegal plain text: JSON object', text, options);

  if (/\n/.test(text) && !options.allowNewlines) throw new DetectorError('Illegal plain text: contains newlines', text, options);

  if (options.bracketsAllowanceTreshold >= 0) {

    var numWords = text.split(utils.re.whitespace).length;
    var numBrackets = (text.match(/[\[\]]/g) || []).length;
    var ratio = numBrackets / numWords;

    if (ratio > options.bracketsAllowanceTreshold) throw new DetectorError('Illegal plain text: contains too many brackets (' + ratio + ')', text, options);
  }

  return 'plain text';
};

},{"../../utils":94,"underscore":14}],61:[function(require,module,exports){
'use strict';

module.exports = ['form'];
module.exports.hasComments = false;

},{}],62:[function(require,module,exports){
'use strict';

var _ = require('underscore');

var utils = require('../../utils');
var GeneratorError = utils.GeneratorError;
var getLoss = require('./get-loss');

module.exports = function (sent, options) {

  if (!sent.isParsed) return {
    output: null,
    loss: undefined
  };

  if (!sent || sent.name !== 'Sentence') throw new GeneratorError('Unable to generate, input not a Sentence', sent, options);

  options = _.defaults(options, sent.options, {});

  sent.index();

  var output = sent.tokens.map(function (token) {

    return token.isSuperToken ? token.subTokens.map(function (subToken) {
      return subToken.value;
    }).join(' ') : token.form;
  }).join(' ').replace(utils.re.spaceBeforePunctuation, '$1');

  return {
    output: output,
    loss: getLoss(sent)
  };
};

},{"../../utils":94,"./get-loss":63,"underscore":14}],63:[function(require,module,exports){
'use strict';

var _ = require('underscore');

var utils = require('../../utils');
var fields = require('./fields');

module.exports = function (sent) {

  var serial = sent.serialize();
  var losses = new Set();

  if (serial.comments.length) losses.add('comments');

  serial.tokens.forEach(function (token) {
    Object.keys(_.omit(token, fields)).forEach(function (field) {
      switch (field) {
        case 'uuid':
        case 'index':
          break;

        case 'feats':
        case 'misc':
          if (token[field] && token[field].length) losses.add(field);
          break;

        case 'heads':
          if (token.heads.length) losses.add('heads');
          break;

        default:
          if (token[field]) losses.add(field);
      }
    });
  });

  return Array.from(losses);
};

},{"../../utils":94,"./fields":61,"underscore":14}],64:[function(require,module,exports){
'use strict';

module.exports = {

  name: 'plain text',
  fields: require('./fields'),
  split: require('./splitter'),
  detect: require('./detector'),
  parse: require('./parser'),
  generate: require('./generator')

};

},{"./detector":60,"./fields":61,"./generator":62,"./parser":65,"./splitter":66}],65:[function(require,module,exports){
'use strict';

var _ = require('underscore');

var utils = require('../../utils');
var ParserError = utils.ParserError;
var detect = require('./detector');

module.exports = function (text, options) {

  options = _.defaults(options, {
    allowEmptyString: true
  });

  text = text || '';

  try {
    detect(text, options);
  } catch (e) {
    if (e instanceof utils.DetectorError) throw new ParserError(e.message);

    throw e;
  }

  //console.log();
  //console.log(text);

  var chunks = [];
  var word = '';

  _.each(text, function (char, i) {

    if (utils.re.whitespace.test(char)) {

      chunks.push(word);
      word = '';
    } else if (utils.re.punctuation.test(char)) {

      if (!utils.re.allPunctuation.test(word)) {
        chunks.push(word);
        word = '';
      }
      word += char;
    } else {
      word += char;
    }
  });

  chunks.push(word);

  //console.log(chunks);

  var tokens = chunks.filter(utils.thin).map(function (chunk, i) {
    return {
      form: chunk,
      index: i
    };
  });

  //console.log(comments);
  //console.log(tokens);

  return {
    input: text,
    options: options,
    comments: [],
    tokens: tokens
  };
};

},{"../../utils":94,"./detector":60,"underscore":14}],66:[function(require,module,exports){
'use strict';

var _ = require('underscore');
var utils = require('../../utils');

module.exports = function (text) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};


  options = _.defaults(options, {
    trimChunks: true
  });

  return text.split(utils.re.sentenceThenPunctuation).map(function (chunk) {
    if (options.trimChunks) {
      return chunk.trim();
    } else {
      return chunk;
    }
  }).filter(utils.thin);
};

},{"../../utils":94,"underscore":14}],67:[function(require,module,exports){
'use strict';

var _ = require('underscore');

var utils = require('../../utils');
var DetectorError = utils.DetectorError;

module.exports = function (text, options) {

  options = _.defaults(options, {
    allowEmptyString: false,
    allowLeadingWhitespace: true,
    allowBookendWhitespace: true,
    allowTrailingWhitespace: true,
    allowNoDependencies: false
  });

  if (!text && !options.allowEmptyString) throw new DetectorError('Illegal SD: empty string', text, options);

  if (utils.isJSONSerializable(text)) throw new DetectorError('Illegal SD: JSON object', text, options);

  // be more or less strict about whitespace
  var dependencyRegex = options.allowBookendWhitespace ? utils.re.sdDependency : utils.re.sdDependencyNoWhitespace;

  // internal stuff
  var parsingDeps = false;
  var parsingWhitespace = false;
  var parsedDeps = 0;

  var lines = text.split(/\n/);
  lines.forEach(function (line, i) {

    if (utils.re.whiteline.test(line)) {
      if (parsingDeps) {
        if (!options.allowTrailingWhitespace) throw new DetectorError('Illegal SD: contains trailing whitespace', text, options);
      } else {
        if (!options.allowLeadingWhitespace) throw new DetectorError('Illegal SD: contains leading whitespace', text, options);
      }
    }

    if (utils.re.comment.test(line)) {} else if (!parsingDeps) {

      if (dependencyRegex.test(line)) throw new DetectorError('Illegal SD: missing text line', text, options);

      parsingDeps = true;
    } else if (!dependencyRegex.test(line)) {

      throw new DetectorError('Illegal SD: expected dependency line', text, options);
    } else {

      parsedDeps += 1;
    }
  });

  if (parsedDeps === 0 && !options.allowNoDependencies) throw new DetectorError('Illegal SD: contains no dependencies', text, options);

  return 'SD';
};

},{"../../utils":94,"underscore":14}],68:[function(require,module,exports){
'use strict';

module.exports = ['form', 'heads'];
module.exports.hasComments = true;

},{}],69:[function(require,module,exports){
'use strict';

var _ = require('underscore');

var utils = require('../../utils');
var GeneratorError = utils.GeneratorError;
var generateText = require('../plain-text').generate;
var getLoss = require('./get-loss');

module.exports = function (sent, options) {

  if (!sent.isParsed) return {
    output: null,
    loss: undefined
  };

  if (!sent || sent.name !== 'Sentence') throw new GeneratorError('Unable to generate, input not a Sentence', sent, options);

  options = _.defaults(options, sent.options, {});

  sent.index();

  var lines = [];
  sent.comments.forEach(function (comment) {
    lines.push('# ' + comment.body);
  });

  lines.push(generateText(sent).output);

  [sent.root].concat(sent.tokens).forEach(function (token) {

    token.mapDependents(function (dependent) {
      lines.push((dependent.deprel || '_') + '(' + token.form + ', ' + dependent.token.form + ')');
    });
  });

  /*
  sent.root.mapDependents(dependent => lines.push(`${dependent.deprel}(${})`))
  if (sent.root)
    lines.push(`root(ROOT, ${sent.root.form})`);
   sent.tokens.forEach(token => {
     if (token._head && token.deprel && token._head.name !== 'RootToken')
      lines.push(`${token.deprel}(${token._head.form}, ${token.form})`);
   });
  */

  return {
    output: lines.join('\n'),
    loss: getLoss(sent)
  };
};

},{"../../utils":94,"../plain-text":64,"./get-loss":70,"underscore":14}],70:[function(require,module,exports){
'use strict';

var _ = require('underscore');

var utils = require('../../utils');
var fields = require('./fields');

module.exports = function (sent) {

  var serial = sent.serialize();
  var losses = new Set();

  serial.tokens.forEach(function (token) {
    if (token.heads && token.heads.length > 1) losses.add('enhanced dependencies');

    Object.keys(_.omit(token, fields)).forEach(function (field) {
      switch (field) {
        case 'uuid':
        case 'index':
        case 'deps':
          break;

        case 'heads':
          if (token.heads.length > 1) losses.add(field);
          break;

        case 'feats':
        case 'misc':
          if (token[field] && token[field].length) losses.add(field);
          break;

        default:
          if (token[field]) losses.add(field);
      }
    });
  });

  return Array.from(losses);
};

},{"../../utils":94,"./fields":68,"underscore":14}],71:[function(require,module,exports){
'use strict';

module.exports = {

  name: 'SD',
  fields: require('./fields'),
  split: require('../default-splitter'),
  detect: require('./detector'),
  parse: require('./parser'),
  generate: require('./generator')

};

},{"../default-splitter":44,"./detector":67,"./fields":68,"./generator":69,"./parser":72}],72:[function(require,module,exports){
'use strict';

var _ = require('underscore');

var utils = require('../../utils');
var ParserError = utils.ParserError;
var detect = require('./detector');
var parseText = require('../plain-text').parse;

module.exports = function (text, options) {

  function getTokenIndexFromString(tokens, token) {
    for (var i = 0; i < tokens.length; i++) {
      if (tokens[i].form.toLowerCase() === token.toLowerCase()) return i;
    }

    return null;
  }

  //console.log();
  //console.log(text);

  options = _.defaults(options, {
    allowEmptyString: false,
    allowBookendWhitespace: true,
    allowWhiteLines: true
  });

  try {
    detect(text, options);
  } catch (e) {
    if (e instanceof utils.DetectorError) throw new ParserError(e.message);

    throw e;
  }

  var lines = text.split('\n');
  var depRegex = options.allowBookendWhitespace ? utils.re.sdDependencyNoWhitespace : utils.re.sdDependency;

  var chunks = [];
  lines.forEach(function (line) {

    var whiteline = line.match(utils.re.whiteline),
        comment = line.match(utils.re.comment),
        dep = line.match(depRegex);

    if (whiteline) {} else if (comment) {

      chunks.push({
        type: 'comment',
        body: comment[2]
      });
    } else if (dep) {

      chunks.push({
        type: 'dependency',
        deprel: dep[1],
        head: dep[2],
        dep: dep[3]
      });
    } else {

      chunks.push({
        type: 'text',
        body: line
      });
    }
  });

  //console.log(chunks);

  var tokens = void 0;
  var comments = [];
  var expecting = ['comment', 'text'];

  chunks.forEach(function (chunk) {

    if (expecting.indexOf(chunk.type) === -1) throw new ParserError('expecting ' + expecting.join('|') + ', got ' + chunk.type, text, options);

    if (chunk.type === 'comment') {

      comments.push(chunk.body);
      expecting = ['comment', 'text'];
    } else if (chunk.type === 'text') {

      tokens = parseText(chunk.body).tokens;
      expecting = ['dependency'];
    } else if (chunk.type === 'dependency') {

      var index = getTokenIndexFromString(tokens, chunk.dep);
      if (index === null) throw new ParserError('unable to find token with form ' + chunk.dep, text, options);

      tokens[index].heads = [{
        index: getTokenIndexFromString(tokens, chunk.head),
        deprel: chunk.deprel
      }];
      expecting = ['dependency'];
    } else {
      throw new ParserError('unrecognized chunk type: ' + chunk.type, text, options);
    }
  });

  //console.log(comments);
  //console.log(tokens);

  return {
    input: text,
    options: options,
    comments: comments,
    tokens: tokens
  };
};

},{"../../utils":94,"../plain-text":64,"./detector":67,"underscore":14}],73:[function(require,module,exports){
'use strict';

var _ = require('underscore');

var utils = require('./utils');
var GeneratorError = utils.GeneratorError;

var as = {

  'apertium stream': require('./formats/apertium-stream').generate,
  apertiumStream: require('./formats/apertium-stream').generate,
  Brackets: require('./formats/brackets').generate,
  brackets: require('./formats/brackets').generate,
  CG3: require('./formats/cg3').generate,
  cg3: require('./formats/cg3').generate,
  'CoNLL-U': require('./formats/conllu').generate,
  conllu: require('./formats/conllu').generate,
  'notatrix serial': require('./formats/notatrix-serial').generate,
  notatrixSerial: require('./formats/notatrix-serial').generate,
  Params: require('./formats/params').generate,
  params: require('./formats/params').generate,
  'plain text': require('./formats/plain-text').generate,
  plainText: require('./formats/plain-text').generate,
  SD: require('./formats/sd').generate,
  sd: require('./formats/sd').generate

};

module.exports = as;

},{"./formats/apertium-stream":23,"./formats/brackets":30,"./formats/cg3":36,"./formats/conllu":42,"./formats/notatrix-serial":50,"./formats/params":57,"./formats/plain-text":64,"./formats/sd":71,"./utils":94,"underscore":14}],74:[function(require,module,exports){
'use strict';

var _ = require('underscore');
var nx = require('./nx');
var errors = require('./utils/errors');

module.exports = _.extend({

  constants: require('./utils/constants'),
  formats: require('./formats'),
  funcs: require('./utils/funcs'),
  regex: require('./utils/regex'),
  data: require('../data'),

  detect: require('./detector'),
  generate: require('./generator'),
  parse: require('./parser'),
  split: require('./splitter'),
  convert: require('./converter')

}, nx, errors);

},{"../data":6,"./converter":18,"./detector":19,"./formats":45,"./generator":73,"./nx":80,"./parser":89,"./splitter":90,"./utils/constants":91,"./utils/errors":92,"./utils/funcs":93,"./utils/regex":95,"underscore":14}],75:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ = require('underscore');

var utils = require('../utils');
var NxError = utils.NxError;
var NxBaseClass = require('./base-class');
var SubToken = require('./sub-token');

/**
 * Abstraction over a CG3 analysis.  Most sentences have just one of these for
 *  each token.
 */

var Analysis = function (_NxBaseClass) {
  _inherits(Analysis, _NxBaseClass);

  function Analysis(sent, serial) {
    _classCallCheck(this, Analysis);

    var _this = _possibleConstructorReturn(this, (Analysis.__proto__ || Object.getPrototypeOf(Analysis)).call(this, sent, 'Analysis'));

    _this._subTokens = (serial.subTokens || []).map(function (sub) {
      return new SubToken(sent, sub);
    });

    return _this;
  }

  _createClass(Analysis, [{
    key: 'subTokens',
    get: function get() {
      return this._subTokens;
    }
  }]);

  return Analysis;
}(NxBaseClass);

module.exports = Analysis;

},{"../utils":94,"./base-class":76,"./sub-token":86,"underscore":14}],76:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NxBaseClass = function NxBaseClass(name) {
  _classCallCheck(this, NxBaseClass);

  this.name = name;
};

;

module.exports = NxBaseClass;

},{}],77:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ = require('underscore');
var uuid = require('uuid/v4');

var utils = require('../utils');
var NxError = utils.NxError;
var NxBaseClass = require('./base-class');
var RelationSet = require('./relation-set');

/**
 * Ancestor of Token, SubToken, SuperToken.  Implements methods common
 *  to all three of them.
 */

var BaseToken = function (_NxBaseClass) {
  _inherits(BaseToken, _NxBaseClass);

  function BaseToken(sent, name) {
    var serial = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    _classCallCheck(this, BaseToken);

    var _this = _possibleConstructorReturn(this, (BaseToken.__proto__ || Object.getPrototypeOf(BaseToken)).call(this, name));

    _this.sent = sent;
    _this.uuid = uuid();

    _this.uuid = serial.uuid || _this.uuid;

    _this.semicolon = serial.semicolon;
    _this.isEmpty = serial.isEmpty;
    _this.form = serial.form;
    _this.lemma = serial.lemma;
    _this.upostag = serial.upostag;
    _this.xpostag = serial.xpostag;
    _this.feats = serial.feats;
    _this.misc = serial.misc;

    _this._heads = serial.heads;
    _this.heads = new RelationSet(_this, 'dependents');
    _this.dependents = new RelationSet(_this, 'heads');

    _this.indices = {
      conllu: null,
      cg3: null,
      cytoscape: null,
      serial: serial.index
    };
    return _this;
  }

  /**
   * Add a head to a token with a dependency relation.
   *
   * @param {BaseToken} head
   * @param {String} deprel
   */


  _createClass(BaseToken, [{
    key: 'addHead',
    value: function addHead(head, deprel) {

      if (!(head instanceof BaseToken)) throw new NxError('cannot add head unless it is a token');

      if (head === this) throw new NxError('token cannot be its own head');

      if (typeof deprel !== 'string' && deprel != null) throw new NxError('deprel must be a string, null, or undefined');

      // if we're not enhanced, only can have 1 head at a time
      if (!this.sent.options.enhanced) this.heads.clear();

      return this.heads.add(head, deprel);
    }

    /**
     * Change the dependency relation for a given head.
     *
     * @param {BaseToken} head
     * @param {String} deprel
     */

  }, {
    key: 'modifyHead',
    value: function modifyHead(head, deprel) {

      if (!(head instanceof BaseToken)) throw new NxError('cannot add head unless it is a token');

      if (typeof deprel !== 'string' && deprel != null) throw new NxError('deprel must be a string, null, or undefined');

      return this.heads.modify(head, deprel);
    }

    /**
     * Remove a head and its dependency relation.
     *
     * @param {BaseToken} head
     */

  }, {
    key: 'removeHead',
    value: function removeHead(head) {

      if (!(head instanceof BaseToken)) throw new NxError('cannot add head unless it is a token');

      return this.heads.remove(head);
    }

    /**
     * Remove all heads
     */

  }, {
    key: 'removeAllHeads',
    value: function removeAllHeads() {
      return this.heads.clear();
    }

    /**
     * Apply a callback to each of a token's heads
     */

  }, {
    key: 'mapHeads',
    value: function mapHeads(callback) {

      //if (this.sent.options.enhanced) {
      return this.heads.map(callback);
      /*} else {
        return this.heads.first
          ? [ this.heads.first ].map(callback)
          : [].map(callback);
      }*/
    }

    /**
     * Apply a callback to each of token's dependents
     */

  }, {
    key: 'mapDependents',
    value: function mapDependents(callback) {

      return this.dependents.map(callback);
    }

    /**
     * Get the head index for a given format
     *
     * @param {String} format
     * @return {String}
     */

  }, {
    key: 'getHead',
    value: function getHead(format) {

      if (!this.heads.length) return null;

      if (format === 'CoNLL-U') return '' + this.heads.first.token.indices.conllu;

      if (format === 'CG3') return '' + this.heads.first.token.indices.cg3;

      return '' + this.heads.first.token.indices.absolute;
    }
  }, {
    key: '_getDeprel',
    value: function _getDeprel() {

      if (!this.heads.length) return null;

      return this.heads.first.deprel;
    }
  }, {
    key: '_getDeps',
    value: function _getDeps(format) {

      function getIndex(token) {
        if (format === 'CoNLL-U') return token.indices.conllu;

        if (format === 'CG3') return token.indices.cg3;

        return token.indices.absolute;
      }

      if (!this.heads.length || !this.sent.options.enhanced) return [];

      return this.mapHeads(utils.noop).sort(function (x, y) {

        if (getIndex(x.token) < getIndex(y.token)) return -1;

        if (getIndex(x.token) > getIndex(y.token)) return 1;

        return 0;
      }).map(function (head) {

        return head.deprel ? getIndex(head.token) + ':' + head.deprel : '' + getIndex(head.token);
      });
    }

    /**
     * Apply a callback to each of a token's analyses and subTokens
     *
     * @param {Function} callback
     */

  }, {
    key: 'walk',
    value: function walk(callback) {
      var i = 0;
      if (this._analyses) return this._analyses.map(function (analysis) {
        return analysis._subTokens.map(function (subToken) {
          return callback(subToken, ++i);
        });
      });

      return null;
    }

    /**
     * Hash a list of fields to a string
     *
     * @param {String[]} fields
     * @return {String}
     */

  }, {
    key: 'hashFields',
    value: function hashFields() {
      var _this2 = this;

      for (var _len = arguments.length, fields = Array(_len), _key = 0; _key < _len; _key++) {
        fields[_key] = arguments[_key];
      }

      fields = _.flatten(fields);

      var hash = _.intersection(fields, ['form', 'lemma', 'upostag', 'xpostag', 'feats', 'deprel', 'misc', 'isEmpty', 'semicolon']).map(function (field) {
        return '<' + (_this2[field] || field) + '>';
      }).join('|');

      if (fields.indexOf('indices') > -1) hash += '|' + _.map(this.indices, function (index) {
        return '{' + index + '}';
      }).join('');

      if (fields.indexOf('head') > -1) hash += '|(h:' + this.head.token.indices.absolute + ':' + h.deprel + ')';

      if (fields.indexOf('deps') > -1) hash += '|(d:' + (this.mapDeps(function (d) {
        return d.token.indices.absolute + ':' + d.deprel;
      }).join('|') || '') + ')';

      if (fields.indexOf('analyses') > -1 || fields.indexOf('subTokens') > -1) hash += '|[s:' + (this.walk(function (t) {
        return t.hashFields(fields);
      }) || '') + ']';

      return hash;
    }

    /**
     * Serialize a token to JSON format
     */

  }, {
    key: 'serialize',
    value: function serialize() {
      var serial = {

        uuid: this.uuid,
        form: this.form,
        index: this.indices.absolute,

        semicolon: this.semicolon,
        isEmpty: this.isEmpty,
        lemma: this.lemma,
        upostag: this.upostag,
        xpostag: this.xpostag,
        feats: this._feats,
        misc: this._misc,
        heads: this.mapHeads(function (head) {
          return {
            index: head.token.indices.absolute,
            deprel: head.deprel
          };
        })
      };

      if (this._analyses && this._analyses.length) serial.analyses = this._analyses.map(function (analysis) {
        return {
          subTokens: analysis._subTokens.map(function (subToken) {
            return subToken.serialize();
          })
        };
      });

      serial = _.pick(serial, function (value) {
        return value !== undefined;
      });

      return serial;
    }
  }, {
    key: 'isSuperToken',
    get: function get() {
      return !!(this._analyses || []).reduce(function (total, analysis) {
        return total += analysis._subTokens.length;
      }, 0);
    }
  }, {
    key: 'value',
    get: function get() {
      return this.form || this.lemma;
    }
  }, {
    key: 'feats',
    get: function get() {
      return this._feats_init ? this._feats.length ? this._feats.join('|') : null : undefined;
    },
    set: function set(feats) {
      if (feats === undefined) return;

      this._feats_init = true;
      this._feats = feats || [];
    }
  }, {
    key: 'misc',
    get: function get() {
      return this._misc_init ? this._misc.length ? this._misc.join('|') : null : undefined;
    },
    set: function set(misc) {
      // [(serial.misc || ''), (serial.other || []).join('|')].join('|');
      if (misc === undefined) return;

      this._misc_init = true;
      this._misc = misc || [];
    }
  }, {
    key: 'other',
    set: function set(other) {
      if (other === undefined) return;

      if (typeof other === 'string') other = [other];

      this._misc_init = true;
      this._misc = (other || []).filter(utils.thin);
    }
  }]);

  return BaseToken;
}(NxBaseClass);

module.exports = BaseToken;

},{"../utils":94,"./base-class":76,"./relation-set":83,"underscore":14,"uuid/v4":17}],78:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ = require('underscore');

var utils = require('../utils');
var NxBaseClass = require('./base-class');
var Label = require('./label');

/**
 * Abstraction over a CoNLL-U or CG3 comment, allows us to extract and then
 *  manipulate data in some useful ways across a Corpus.
 */

var Comment = function (_NxBaseClass) {
  _inherits(Comment, _NxBaseClass);

  function Comment(sent, body) {
    _classCallCheck(this, Comment);

    var _this = _possibleConstructorReturn(this, (Comment.__proto__ || Object.getPrototypeOf(Comment)).call(this, sent, 'Comment'));

    _this.type = 'normal';
    _this.body = body;

    var label = body.match(utils.re.commentLabel),
        sentId = body.match(utils.re.commentSentId);

    if (label) {

      var labels = [];
      label[3].split(/\s/).forEach(function (label) {
        if (label && labels.indexOf(label) === -1) labels.push(label);
      });

      _this.type = 'label';
      _this.labels = labels;
    } else if (sentId) {

      _this.type = 'sent-id';
      _this.id = sentId[2];
    }
    return _this;
  }

  _createClass(Comment, [{
    key: 'serialize',
    value: function serialize() {
      return this.body;
    }
  }]);

  return Comment;
}(NxBaseClass);

module.exports = Comment;

},{"../utils":94,"./base-class":76,"./label":81,"underscore":14}],79:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ = require('underscore');
var fs = require('fs');
var path = require('path');
var uuid = require('uuid/v4');

var utils = require('../utils');
var NxError = utils.NxError;

var split = require('../splitter');
var detect = require('../detector');
var parse = require('../parser');
var generate = require('../generator');
var convert = require('../converter');

var NxBaseClass = require('./base-class');
var Labeler = require('./labeler');
var Sentence = require('./sentence');

/**
 * Abstraction over a collection of Sentences.  NOTE: this class is
 *  out-of-date and will be replaced soon :)
 */

var Corpus = function (_NxBaseClass) {
  _inherits(Corpus, _NxBaseClass);

  function Corpus(options) {
    _classCallCheck(this, Corpus);

    var _this = _possibleConstructorReturn(this, (Corpus.__proto__ || Object.getPrototypeOf(Corpus)).call(this, 'Corpus'));

    _this.treebank_id = uuid();

    options = _.defaults(options, {
      requireOne: true
    });
    _this.filename = null;
    _this.options = options;
    _this.sources = [];

    _this._labeler = new Labeler(_this);
    _this._sentences = [];
    _this._index = -1;
    _this._meta = {};
    _this._filterIndex = -1;

    return _this;
  }

  _createClass(Corpus, [{
    key: 'serialize',
    value: function serialize() {
      var _this2 = this;

      return {
        filename: this.filename,
        meta: this._meta,
        options: this.options,
        labeler: this._labeler.serialize(),
        sentences: this._sentences.map(function (sent) {
          return sent.serialize(_this2.options);
        }),
        index: this._index
      };
    }
  }, {
    key: 'reindex',
    value: function reindex() {
      this._sentences.forEach(function (sent, i) {
        sent._index = i;
      });
    }
  }, {
    key: 'first',
    value: function first() {

      this.index = this.length ? 0 : -1;
      return this;
    }
  }, {
    key: 'prev',
    value: function prev() {

      if (!this.length) return null;

      var filtered = this.filtered;
      var index = filtered.length ? this._filterIndex : this._index;

      if (index === 0) return null;

      this.index = --index;
      return this;
    }
  }, {
    key: 'next',
    value: function next() {

      if (!this.length) return null;

      var filtered = this.filtered;
      var index = filtered.length ? this._filterIndex : this._index;
      var total = filtered.length ? filtered.length - 1 : this._length - 1;

      if (index === total) return null;

      this.index = ++index;
      return this;
    }
  }, {
    key: 'last',
    value: function last() {

      var filtered = this.filtered;
      this.index = filtered.length ? filtered.length - 1 : this.length - 1;

      return this;
    }
  }, {
    key: 'getSentence',
    value: function getSentence(index) {

      if (index == undefined) index = this.index;

      if (0 > index || index > this.length - 1) return null;

      return this._sentences[index] || null;
    }
  }, {
    key: 'setSentence',
    value: function setSentence(index, text) {

      if (text === null || text === undefined) {
        // if only passed 1 arg
        text = index || '';
        index = this.index;
      }

      index = parseInt(index);
      if (isNaN(index) || this.getSentence(index) === null) throw new NxError('cannot set sentence at index ' + index);

      this._labeler.onRemove(this.getSentence(index));
      var sent = new Sentence(text, this.options);
      sent.corpus = this;

      this._sentences[index] = sent;
      this._labeler.onAdd(sent);
      this.reindex();

      return sent;
    }
  }, {
    key: 'insertSentence',
    value: function insertSentence(index, text) {

      if (text === null || text === undefined) {
        // if only passed 1 arg
        text = index || '';
        index = this.index + 1;
      }

      index = parseFloat(index);
      if (isNaN(index)) throw new NxError('cannot insert sentence at index ' + index);

      index = index < 0 ? 0 : index > this.length ? this.length : parseInt(index);

      var sent = new Sentence(text, this.options);
      sent.corpus = this;

      this._sentences = this._sentences.slice(0, index).concat(sent).concat(this._sentences.slice(index));
      this._labeler.onAdd(sent);

      this.index = index;
      this.reindex();
      return sent;
    }
  }, {
    key: 'removeSentence',
    value: function removeSentence(index) {

      if (!this.length) return null;

      if (index === undefined) // if not passed args
        index = this.index;

      index = parseFloat(index);
      if (isNaN(index)) throw new NxError('cannot remove sentence at index ' + index);

      index = index < 0 ? 0 : index > this.length - 1 ? this.length - 1 : parseInt(index);

      var removed = this._sentences.splice(index, 1)[0];
      if (!this.length) this.insertSentence();

      this._labeler.onRemove(removed);

      if (index <= this.index) this.index--;
      this.reindex();
      return removed;
    }
  }, {
    key: 'pushSentence',
    value: function pushSentence(text) {
      return this.insertSentence(Infinity, text);
    }
  }, {
    key: 'popSentence',
    value: function popSentence(text) {
      return this.removeSentence(Infinity);
    }
  }, {
    key: 'parse',
    value: function parse(string) {
      var _this3 = this;

      var splitted = split(string, this.options); // might throw errors
      var index = this.index || 0;

      splitted.forEach(function (split, i) {
        //console.log(i, split);
        _this3.insertSentence(index + i, split, false);
      });

      return this;
    }
  }, {
    key: 'readFile',
    value: function readFile(filepath, next) {
      var _this4 = this;

      fs.exists(filepath, function (exists) {
        if (!exists) throw new NxError('cannot read file: cannot find path ' + filepath);

        fs.readFile(filepath, function (err, data) {
          if (err) throw err;

          data = data.toString();
          _this4.parse(data);
          _this4.sources.push(filepath);
          _this4.filename = path.basename(filepath);

          if (next) next(_this4);
        });
      });
    }
  }, {
    key: 'writeFile',
    value: function writeFile(format, filepath) {

      filepath = this.getWritePath(filepath);

      var contents = this.serialize();
      fs.writeFile(filepath, contents, function (err) {
        if (err) throw err;
      });

      return this;
    }
  }, {
    key: 'getWritePath',
    value: function getWritePath(filepath) {

      if (filepath) return filepath;

      var lastSource = this.sources.slice(-1)[0];
      return (lastSource || 'export') + '.nxcorpus';
    }
  }, {
    key: 'snapshot',
    get: function get() {
      return {
        filename: this.filename,
        sentences: this.length,
        errors: this.errors.length,
        labels: this._labeler.sort()
      };
    }
  }, {
    key: 'length',
    get: function get() {
      return this._sentences.length;
    }
  }, {
    key: 'errors',
    get: function get() {
      return this._sentences.filter(function (sent) {
        if (!sent.isParsed) return sent;
      });
    }
  }, {
    key: 'topLabels',
    get: function get() {
      return this._labeler.top;
    }
  }, {
    key: 'sentence',
    get: function get() {
      return this.index < 0 ? null : this._sentences[this.index];
    }
  }, {
    key: 'filtered',
    get: function get() {
      var _this5 = this;

      return this._labeler._filter.size ? this._sentences.filter(function (sent) {
        return _this5._labeler.sentenceInFilter(sent);
      }) : [];
    }
  }, {
    key: 'index',
    get: function get() {
      return this._index;
    },
    set: function set(index) {

      var filtered = this.filtered,
          total = filtered.length || this.length;

      index = parseInt(index);
      if (isNaN(index)) {
        index = filtered.length ? this._filterIndex : this.index;
      } else if (index < 0 && total) {
        index = 0;
      } else if (index > total - 1) {
        index = total - 1;
      }

      if (filtered.length) {
        this._filterIndex = index;
        this._index = filtered[index]._index;
      } else {
        this._filterIndex = -1;
        this._index = index;
      }

      return this.index;
    }
  }], [{
    key: 'deserialize',
    value: function deserialize(serial) {

      var corpus = new Corpus(serial.options);
      corpus.filename = serial.filename || null;
      corpus._meta = serial.meta;
      corpus._labeler = Labeler.deserialize(corpus, serial.labeler);
      corpus._sentences = serial.sentences.map(function (s) {

        var sent = new Sentence(s, _.defaults(s.options, serial.options));
        sent._meta = s.meta;

        _.each(corpus._labeler._labels, function (label, name) {
          if (corpus._labeler.sentenceHasLabel(sent, name)) label._sents.add(sent);
        });

        return sent;
      });
      corpus.index = serial.index;

      return corpus;
    }
  }, {
    key: 'fromString',
    value: function fromString(string, options) {

      var corpus = new Corpus(options);
      corpus.parse(string);
      return corpus;
    }
  }, {
    key: 'fromFile',
    value: function fromFile(filepath, options, next) {

      if (next === undefined) {
        next = options;
        options = {};
      }
      var corpus = new Corpus(options);
      corpus.readFile(filepath, next);

      return this;
    }
  }]);

  return Corpus;
}(NxBaseClass);

module.exports = Corpus;

},{"../converter":18,"../detector":19,"../generator":73,"../parser":89,"../splitter":90,"../utils":94,"./base-class":76,"./labeler":82,"./sentence":85,"fs":11,"path":12,"underscore":14,"uuid/v4":17}],80:[function(require,module,exports){
'use strict';

module.exports = {

  NxBaseClass: require('./base-class'),
  Corpus: require('./corpus'),
  Labeler: require('./labeler'),
  Sentence: require('./sentence'),
  Comment: require('./comment'),
  BaseToken: require('./base-token'),
  RootToken: require('./root-token'),
  Token: require('./token'),
  Analysis: require('./analysis'),
  SubToken: require('./sub-token'),
  RelationSet: require('./relation-set')

};

},{"./analysis":75,"./base-class":76,"./base-token":77,"./comment":78,"./corpus":79,"./labeler":82,"./relation-set":83,"./root-token":84,"./sentence":85,"./sub-token":86,"./token":87}],81:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ = require('underscore');

var utils = require('../utils');
var NxBaseClass = require('./base-class');

/**
 * Allows us to extract labels from "field = value"-type comments, so that
 *  we can filter a corpus by Label and arbitrarily apply that label to
 *  multiple Sentences.
 */

var Label = function (_NxBaseClass) {
  _inherits(Label, _NxBaseClass);

  function Label(name) {
    _classCallCheck(this, Label);

    var _this = _possibleConstructorReturn(this, (Label.__proto__ || Object.getPrototypeOf(Label)).call(this, 'Label'));

    _this.name = name;
    _this.bColor = utils.hashStringToHex(name);
    _this.tColor = utils.getContrastingColor(_this.bColor);
    _this.desc = '';

    return _this;
  }

  _createClass(Label, [{
    key: 'serialize',
    value: function serialize() {
      return {
        name: this.name,
        desc: this.desc,
        bColor: this.bColor,
        tColor: this.tColor
      };
    }
  }], [{
    key: 'deserialize',
    value: function deserialize(serial) {

      var label = new Label(serial.name);
      label.desc = serial.desc;
      label.bColor = serial.bColor;
      label.tColor = serial.tColor;

      return label;
    }

    /*
     set state(state) {
      if (!state.name)
        throw new DeserializationError(`cannot set name to "${state.name}"`);
       state.desc = state.desc || '';
      if (typeof state.desc !== 'string')
        throw new DeserializationError(`cannot set description to non-string value`);
       this.name = state.name;
      this.desc = state.desc;
       if (!this.changeColor(state.bColor))
        throw new DeserializationError(`cannot set background color to "${state.bColor}"`);
    }
     render(labeler) {
       const inComments = labeler.has(this.name),
        filtering = labeler._filter.has(this.name);
       $(`#labels-horiz`).append($('<li>')
        .attr('name', this.name)
        .addClass('label horiz')
        .addClass(inComments ? 'in-comments' : 'not-in-comments')
        .addClass(filtering  ? 'filtering'   : 'not-filtering')
        .append($('<div>')
          .addClass('label-text')
          .text(this.name)
          .css('background-color', this.bColor)
          .css('color', this.tColor)
          .click(e => labeler.handle.click.label(e))
        )
        .append($('<div>')
          .addClass('label-hidden')
          .append($('<div>')
            .addClass('label-hidden-group')
            .append($('<div>')
              .addClass('label-hidden-item')
              .append($('<strong>')
                .text('Name')
              )
              .append($('<input>')
                .attr('name', 'label-name')
                .val(this.name)
                .keyup(e => labeler.handle.keyup.name(e))
              ))
            .append($('<div>')
              .addClass('label-hidden-item')
              .append($('<strong>')
                .text('Description')
              )
              .append($('<input>')
                .attr('name', 'label-desc')
                .val(this.desc)
                .keyup(e => labeler.handle.keyup.desc(e))
              ))
            .append($('<div>')
              .addClass('label-hidden-item')
              .append($('<strong>')
                .text('Color')
              )
              .append($('<div>')
                .addClass('label-hidden-item-inner')
                .append($('<span>')
                  .addClass('hex-color-group')
                  .text('#')
                  .append($('<input>')
                    .attr('name', 'label-color')
                    .attr('pattern', '[A-Fa-f\\d]{6}')
                    .val(this.bColor.substr(1))
                    .keyup(e => labeler.handle.keyup.color(e))
                  )
                )
                .append($('<button>')
                  .attr('type', 'button')
                  .addClass('btn btn-secondary refresh-color')
                  .css('background-color', this.bColor)
                  .click(e => labeler.handle.click.refresh(e))
                  .append($('<i>')
                    .addClass('fa fa-refresh')
                  )
                )
              )
            )
          )
          .append($('<hr>'))
          .append($('<div>')
            .addClass('label-hidden-group')
            .append($('<div>')
              .addClass('label-hidden-item')
              .append($('<div>')
                .addClass('label-hidden-item-inner')
                .append($('<input>')
                  .attr('name', 'filtering')
                  .attr('type', 'checkbox')
                  .prop('checked', filtering)
                  .click(e => labeler.handle.click.checkbox.filtering(e))
                )
                .append($('<span>')
                  .addClass('filtering-label checkbox-label')
                  .text('filtering')
                )
              )
            )
          )
          .append($('<hr>'))
          .append($('<div>')
            .addClass('label-hidden-group')
            .append($('<div>')
              .addClass('label-hidden-item delete-item')
              .append($('<button>')
                .attr('type', 'button')
                .addClass('btn btn-secondary delete-button')
                .text('delete')
                .click(e => labeler.handle.click.delete(e))
              )
            )
          )
        )
      );
    }
    */

  }]);

  return Label;
}(NxBaseClass);

module.exports = Label;

},{"../utils":94,"./base-class":76,"underscore":14}],82:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ = require('underscore');

var utils = require('../utils');
var NxBaseClass = require('./base-class');
var Label = require('./label');

/**
 * Abstraction to hold a mapping of String => Label pairs, as well as some
 *  methods for doing work on those labels.
 */

var Labeler = function (_NxBaseClass) {
  _inherits(Labeler, _NxBaseClass);

  function Labeler(corpus) {
    _classCallCheck(this, Labeler);

    var _this = _possibleConstructorReturn(this, (Labeler.__proto__ || Object.getPrototypeOf(Labeler)).call(this, 'Labeler'));

    _this.corpus = corpus;

    _this._labels = {};
    _this._filter = new Set();

    return _this;
  }

  /**
   * @typedef Labeler_SortReturnT
   * @property {String} name Label name
   * @property {Number} size Number of sentences with Label
   */

  /**
   * Sort all labels in Corpus by number of Sentences with that label
   *
   * @return {Labeler_SortReturnT}
   */


  _createClass(Labeler, [{
    key: 'sort',
    value: function sort() {
      var _this2 = this;

      var size = function size(name) {
        return _this2._labels[name]._sents.size;
      };

      return Object.keys(this._labels).sort(function (x, y) {

        if (size(x) < size(y)) return 1;

        if (size(x) > size(y)) return -1;

        return 0;
      }).map(function (name) {

        return {
          name: name,
          size: _this2._labels[name]._sents.size
        };
      });
    }
  }, {
    key: 'serialize',
    value: function serialize() {
      return {
        labels: _.map(this._labels, function (label) {
          return label._label.serialize();
        }),
        filter: Array.from(this._filter)
      };
    }
  }, {
    key: 'get',


    /**
     * Get a Label given its name
     *
     * @param {String} name
     * @return {Label}
     */
    value: function get(name) {
      return this._labels[name];
    }

    /**
     * Get the number of sentences with a given Label
     *
     * @param {String} name
     * @return {Number}
     */

  }, {
    key: 'count',
    value: function count(name) {
      return this._labels[name] ? this._labels[name]._sents.size : 0;
    }

    /**
     * Crawl through a sentence's comments to see if it has a particular Label
     *
     * @param {Sentence} sent
     * @param {String} searching
     * @return {Boolean}
     */

  }, {
    key: 'sentenceHasLabel',
    value: function sentenceHasLabel(sent, searching) {

      var hasLabel = false;
      sent.comments.forEach(function (comment) {
        if (comment.type === 'label') {
          comment.labels.forEach(function (name) {
            if (name === searching) hasLabel = true;
          });
        }
      });

      return hasLabel;
    }

    /**
     * Checks if a given Sentence should be filtered
     *
     * @param {Sentence} sent
     * @return {Boolean}
     */

  }, {
    key: 'sentenceInFilter',
    value: function sentenceInFilter(sent) {
      var _this3 = this;

      var inFilter = false;
      sent.comments.forEach(function (comment) {
        if (comment.type === 'label') {
          comment.labels.forEach(function (name) {
            if (_this3._filter.has(name)) inFilter = true;
          });
        }
      });

      return inFilter;
    }

    /**
     * Adds a Label name to the filter
     *
     * @param {String} name
     */

  }, {
    key: 'addToFilter',
    value: function addToFilter(name) {
      if (this.get(name)) return this._filter.add(name);
    }

    /**
     * Removes a Label name from the filter
     *
     * @param {String} name
     */

  }, {
    key: 'removeFromFilter',
    value: function removeFromFilter(name) {
      return this._filter.delete(name);
    }

    /**
     * Callback to be triggered whenever we add a new Sentence to a Corpus
     *
     * @param {Sentence} sent
     */

  }, {
    key: 'onAdd',
    value: function onAdd(sent) {
      var _this4 = this;

      sent.comments.forEach(function (comment) {
        if (comment.type === 'label') {
          comment.labels.forEach(function (name) {

            _this4.addLabel(name, [sent]);
          });
        }
      });
    }

    /**
     * Callback to be triggered whenever we remove a Sentence from a Corpus
     *
     * @param {Sentence} sent
     */

  }, {
    key: 'onRemove',
    value: function onRemove(sent) {
      var _this5 = this;

      sent.comments.forEach(function (comment) {
        if (comment.type === 'label') {
          comment.labels.forEach(function (name) {

            _this5.removeLabel(name, [sent]);
          });
        }
      });
    }

    /**
     * Add new Label with the given name (if it doesn't already exist) and
     *  attach it to a list of Sentences.
     *
     * @param {String} name
     * @param {Sentence[]} [sents=[]]
     */

  }, {
    key: 'addLabel',
    value: function addLabel(name) {
      var sents = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];


      var label = this.get(name);
      if (label) {
        var _label$_sents;

        (_label$_sents = label._sents).add.apply(_label$_sents, _toConsumableArray(sents));
      } else {

        label = {
          _label: new Label(name),
          _sents: new Set()
        };
        this._labels[name] = label;
      }

      sents.forEach(function (sent) {
        sent.comments.forEach(function (comment) {
          if (comment.type === 'label') {

            comment.labels.push(name);
            label._sents.add(sent);
          }
        });
      });

      return label;
    }

    /**
     * Remove a Label by name (if it exists) from a set of Sentences (can
     *  be omitted).
     *
     * @param {String} name
     * @param {Sentence[]} sents
     */

  }, {
    key: 'removeLabel',
    value: function removeLabel(name, sents) {

      var label = this.get(name);
      if (!label) return false;

      (sents || label._sents).forEach(function (sent) {
        sent.comments.forEach(function (comment) {
          if (comment.type === 'label') {

            var index = comment.labels.indexOf(oldName);
            comment.labels.splice(index, 1);
          }
        });
      });

      if (!this.count(name)) delete this._labels[name];

      return label;
    }

    /**
     * Change the name of a Label from oldName => newName
     *
     * @param {String} oldName
     * @param {String} newName
     * @return {Label}
     */

  }, {
    key: 'changeLabelName',
    value: function changeLabelName(oldName, newName) {

      if (this.get(newName)) return false; // already exists

      var oldLabel = this.removeLabel(oldName);
      if (!label) return false;

      var newLabel = this.addLabel(newName, oldLabel._sents);
      newLabel.desc = oldLabel.desc;
      newLabel.bColor = oldLabel.bColor;
      newLabel.tColor = oldLabel.tColor;

      return newLabel;
    }

    /**
     * Change the color of a Label to a given color
     *
     * @param {String} name
     * @param {String} color
     * @return {Boolean} - whether the operation succeeded
     */

  }, {
    key: 'changeLabelColor',
    value: function changeLabelColor(name, color) {

      var label = this.get(name);
      if (!label) return false;

      if (color) {

        color = (color.match(utils.re.hexColorSixDigit) || [])[1];
        var int = parseInt(color, 16);
        if (isNaN(int) || int < 0 || int > magic) return false; // out of bounds
      } else {
        color = utils.getRandomHexColor();
      }

      label._label.bColor = color;
      label._label.tColor = utils.getContrastingColor(color);

      return true;
    }

    /**
     * Change the description of a Label to a given description
     *
     * @param {String} name
     * @param {String} desc
     * @return {Boolean} - whether the operation succeeded
     */

  }, {
    key: 'changeLabelDesc',
    value: function changeLabelDesc(name, desc) {

      var label = this.get(name);
      if (!label) return false;

      if (typeof desc !== 'string') return false;

      label._label.desc = desc;
      return true;
    }
  }], [{
    key: 'deserialize',
    value: function deserialize(corpus, serial) {

      var labeler = new Labeler(corpus);
      serial.labels.forEach(function (label) {
        return labeler.addLabel(label.name);
      });
      serial._filter = new (Function.prototype.bind.apply(Set, [null].concat(_toConsumableArray(serial.filter))))();

      return labeler;
    }
  }]);

  return Labeler;
}(NxBaseClass);

module.exports = Labeler;

},{"../utils":94,"./base-class":76,"./label":81,"underscore":14}],83:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ = require('underscore');

var utils = require('../utils');
var NxBaseClass = require('./base-class');

var RelationSet = function (_NxBaseClass) {
  _inherits(RelationSet, _NxBaseClass);

  function RelationSet(token, partner) {
    _classCallCheck(this, RelationSet);

    var _this = _possibleConstructorReturn(this, (RelationSet.__proto__ || Object.getPrototypeOf(RelationSet)).call(this, 'RelationSet'));

    _this.token = token;
    _this.partner = partner;
    _this._items = [];

    return _this;
  }

  _createClass(RelationSet, [{
    key: 'map',
    value: function map(callback) {
      return this._items.map(callback);
    }
  }, {
    key: 'has',
    value: function has(token) {

      var has = false;
      this.map(function (item) {
        if (item.token === token) has = true;
      });

      return has;
    }
  }, {
    key: 'add',
    value: function add(token, deprel) {
      var origin = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;


      if (this.has(token)) {
        this.modify(token, deprel);
        return false;
      }

      this._items.push({
        token: token,
        deprel: deprel
      });

      if (origin) token[this.partner].add(this.token, deprel, false);

      return true;
    }
  }, {
    key: 'modify',
    value: function modify(token, deprel) {
      var origin = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;


      if (!this.has(token)) return false;

      var ret = void 0;
      this.map(function (item) {
        if (item.token === token) {
          ret = item.deprel !== deprel;
          item.deprel = deprel;
        }
      });

      if (origin) token[this.partner].modify(this.token, deprel, false);

      return ret;
    }
  }, {
    key: 'remove',
    value: function remove(token) {
      var origin = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;


      var at = -1;

      this.map(function (item, i) {
        if (item.token === token) at = i;
      });

      if (at === -1) return null;

      var removed = this._items.splice(at, 1)[0];

      if (origin) token[this.partner].remove(this.token);

      return removed || null;
    }
  }, {
    key: 'clear',
    value: function clear() {
      var _this2 = this;

      var origin = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;


      this.map(function (item) {
        if (origin) item.token[_this2.partner].remove(_this2.token);
      });
      this._items = [];
    }
  }, {
    key: 'length',
    get: function get() {
      return this._items.length;
    }
  }, {
    key: 'first',
    get: function get() {
      return this._items[0] || null;
    }
  }]);

  return RelationSet;
}(NxBaseClass);

module.exports = RelationSet;

},{"../utils":94,"./base-class":76,"underscore":14}],84:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ = require('underscore');

var utils = require('../utils');
var BaseToken = require('./base-token');

var RootToken = function (_BaseToken) {
  _inherits(RootToken, _BaseToken);

  function RootToken(sent) {
    _classCallCheck(this, RootToken);

    var _this = _possibleConstructorReturn(this, (RootToken.__proto__ || Object.getPrototypeOf(RootToken)).call(this, sent, 'RootToken'));

    _this.form = 'ROOT';
    _this.indices = {
      absolute: 0,
      conllu: 0,
      cg3: 0,
      cytoscape: 0
    };
    return _this;
  }

  return RootToken;
}(BaseToken);

module.exports = RootToken;

},{"../utils":94,"./base-token":77,"underscore":14}],85:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ = require('underscore');

var utils = require('../utils');
var NxError = utils.NxError;
var ToolError = utils.ToolError;
var parse = require('../parser');
var generate = require('../generator');

var NxBaseClass = require('./base-class');
var Comment = require('./comment');
var BaseToken = require('./base-token');
var Token = require('./token');
var RootToken = require('./root-token');
var update = require('./update');
var Analysis = require('./analysis');
var SubToken = require('./sub-token');

/**
 * Abstraction over a Sentence.  Holds an array of comments and of tokens,
 *  plus some metadata.
 */

var Sentence = function (_NxBaseClass) {
  _inherits(Sentence, _NxBaseClass);

  function Sentence(serial, options) {
    _classCallCheck(this, Sentence);

    var _this = _possibleConstructorReturn(this, (Sentence.__proto__ || Object.getPrototypeOf(Sentence)).call(this, 'Sentence'));

    _this._meta = {};

    serial = serial || '';
    options = options || {};
    options = _.defaults(options, {
      interpretAs: null,
      addHeadOnModifyFailure: true,
      depsShowDeprel: true,
      showRootDeprel: true,
      enhanced: false,
      useTokenDeprel: true,
      autoAddPunct: true
    });

    _this.input = serial.input == null ? serial : serial.input;
    _this.isParsed = false;
    _this.Error = null;

    try {

      if (options.interpretAs) {

        // interpret as a particular format if passed option
        serial = parse.as[options.interpretAs](serial, options);
      } else {

        // otherwise, get an array of possible interpretations
        serial = parse(serial, options);

        // choose one of them if possible
        if (serial.length === 0) {
          throw new NxError('Unable to parse: unrecognized format', _this);
        } else if (serial.length === 1) {
          serial = serial[0];
        } else {
          throw new NxError('Unable to parse: ambiguous format (' + serial.join(', ') + ')', _this);
        }

        if (serial.isParsed === false) throw new NxError('Cannot parse explicitly unparsed serial');
      }

      _this.options = serial.options;

      _this.root = new RootToken(_this);
      _this.comments = serial.comments.map(function (com) {
        return new Comment(_this, com);
      });
      _this.tokens = serial.tokens.map(function (tok) {
        return new Token(_this, tok);
      });

      _this.attach();
      _this.isParsed = true;
    } catch (e) {

      if (e instanceof NxError || e instanceof ToolError) {

        _this.options = serial.options || options;
        _this.comments = [];
        _this.tokens = [];
        _this.Error = e;
      } else {
        throw e;
      }
    }
    return _this;
  }

  /**
   * Output Sentence to a given format
   *
   * @param {String} format
   * @param {Object} options
   */


  _createClass(Sentence, [{
    key: 'to',
    value: function to(format, options) {
      return generate[format](this, options);
    }

    /**
     * Output Sentence to a notatrix-serial string
     */

  }, {
    key: 'serialize',
    value: function serialize() {
      var master = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return {
        meta: this._meta,
        input: this.input,
        isParsed: this.isParsed,
        options: utils.dedup(master, this.options),
        comments: this.isParsed ? this.comments.map(function (com) {
          return com.serialize();
        }) : [],
        tokens: this.isParsed ? this.tokens.map(function (token) {
          return token.serialize();
        }) : []
      };
    }

    /**
     * Apply a callback function for every token in the sentence
     *
     * @param {Function} callback
     */

  }, {
    key: 'iterate',
    value: function iterate(callback) {
      for (var i = 0; i < this.tokens.length; i++) {

        var token = this.tokens[i];
        callback(token, i, null, null);

        for (var j = 0; j < token._analyses.length; j++) {
          for (var k = 0; k < token._analyses[j]._subTokens.length; k++) {

            var subToken = token._analyses[j]._subTokens[k];
            callback(subToken, i, j, k);
          }
        }
      }
    }

    /**
     * Return all tokens where `predicate(token)` is truth-y
     */

  }, {
    key: 'query',
    value: function query(predicate) {

      var matches = [];
      this.iterate(function (token) {
        if (predicate(token)) matches.push(token);
      });

      return matches;
    }
  }, {
    key: 'index',
    value: function index() {

      var absolute = 0,
          majorToken = null,
          superToken = null,
          empty = 0,
          conllu = 0,
          cg3 = 0,
          cytoscape = -1;

      this.iterate(function (token, i, j, k) {

        token.indices.sup = i;
        token.indices.ana = j;
        token.indices.sub = k;
        token.indices.absolute = ++absolute;

        if (!token._analyses || !token._analyses.length) token.indices.cg3 = ++cg3;

        if (!token.isSuperToken && superToken && superToken.analysis === j) token.indices.cytoscape = ++cytoscape;

        if (token.subTokens && token.subTokens.length === 0) token.indices.cytoscape = ++cytoscape;

        if (j === null || k === null) {

          majorToken = token;

          if (superToken) {
            superToken.token.indices.conllu = superToken.start + '-' + superToken.stop;
            superToken = null;
          }

          if (token.subTokens.length) {
            superToken = {
              token: token,
              start: null,
              stop: null,
              analysis: token._i
            };
          } else {

            if (token.isEmpty) {
              empty += 1;
            } else {
              empty = 0;
              conllu += 1;
            }

            token.indices.conllu = empty ? conllu + '.' + empty : conllu;
          }
        } else {

          if (majorToken._i === j) {

            if (token.isEmpty) {
              empty += 1;
            } else {
              empty = 0;
              conllu += 1;
            }

            token.indices.conllu = empty ? conllu + '.' + empty : conllu;
          }

          if (superToken) {
            if (superToken.start === null) {
              superToken.start = empty ? conllu + '.' + empty : conllu;
            } else {
              superToken.stop = empty ? conllu + '.' + empty : conllu;
            }
          }
        }
      });

      if (superToken) {
        superToken.token.indices.conllu = superToken.start + '-' + superToken.stop;
        superToken = null;
      }

      this.size = absolute;
      return this;
    }
  }, {
    key: 'attach',
    value: function attach() {

      this.iterate(function (token) {
        (token._heads || []).forEach(function (dependency, i) {

          if (i) token.sent.options.enhanced = true;

          if (dependency.index == '0') {

            token.addHead(token.sent.root, 'root');
          } else {

            var query = token.sent.query(function (token) {
              return token.indices.serial === dependency.index;
            });
            if (query.length !== 1) {
              //console.log(token)
              throw new NxError('cannot locate token with serial index "' + dependency.index + '"');
            }

            token.addHead(query[0], dependency.deprel);
          }
        });

        delete token._heads;
      });

      return this.index();
    }

    /*update(serial, options) {
      try {
         const sent = new Sentence(serial, options);
        update(this, sent, options);
       } catch(e) {
         if (e instanceof utils.ToolError || utils.NxError)
          throw new NxError('Unable to update: ' + e.message);
         throw e;
      }
    }*/

    /**
     * Tell Sentence to output in enhanced dependency format
     */

  }, {
    key: 'enhance',
    value: function enhance() {
      this.options.enhanced = true;

      this.iterate(function (token) {
        if (!token._head) return;

        token.addDep(token._head, token.deprel);
      });

      return this;
    }

    /**
     * Tell Sentence to stop outputting in enhanced dependency format
     */

  }, {
    key: 'unenhance',
    value: function unenhance() {
      this.options.enhanced = false;
      return this;
    }

    /**
     * Get the superToken for a given token
     *
     * @param {BaseToken} token
     * @return {BaseToken}
     */

  }, {
    key: 'getSuperToken',
    value: function getSuperToken(token) {

      var superToken = null;

      this.iterate(function (tok) {
        if (!tok._analyses) return;

        tok._analyses.forEach(function (ana) {
          if (!ana._subTokens) return;

          ana._subTokens.forEach(function (sub) {
            if (sub === token) superToken = tok;
          });
        });
      });

      return superToken;
    }

    /**
     * Merge tokens into a single, regular token
     *
     * @param {BaseToken} src
     * @param {BaseToken} tar
     */

  }, {
    key: 'merge',
    value: function merge(src, tar) {

      if (!(src instanceof BaseToken) || !(tar instanceof BaseToken)) throw new NxError('unable to merge: src and tar must both be tokens');

      if (src.isSuperToken || tar.isSuperToken) throw new NxError('unable to merge: cannot merge superTokens');

      if (src.name === 'SubToken' || tar.name === 'SuperToken') throw new NxError('unable to merge: cannot merge subTokens');

      if (Math.abs(tar.indices.absolute - src.indices.absolute) > 1) throw new NxError('unable to merge: tokens too far apart');

      // basic copying
      src.semicolon = src.semicolon || tar.semicolon;
      src.isEmpty = src.isEmpty || tar.isEmpty;
      src.form = (src.form || '') + (tar.form || '') || null;
      src.lemma = src.lemma || tar.lemma;
      src.upostag = src.upostag || tar.upostag;
      src.xpostag = src.xpostag || tar.xpostag;

      // array-type copying
      src._feats_init = src._feats_init || tar._feats_init;
      src._feats = src._feats_init ? (src._feats || []).concat(tar._feats || []) : undefined;
      src._misc_init = src._misc_init || tar._misc_init;
      src._misc = src._misc_init ? (src._misc || []).concat(tar._misc || []) : undefined;

      // make sure they don't depend on each other
      src.removeHead(tar);
      tar.removeHead(src);

      // migrate dependent things to the new token
      tar.mapDependents(function (dep) {
        dep.token.removeHead(tar);
        dep.token.addHead(src, dep.deprel);
      });

      // remove heads from the old token
      tar.removeAllHeads();

      // now that all references are gone, safe to splice the target out
      this.tokens.splice(tar.indices.sup, 1);

      return this.index();
    }

    /**
     * Combine tokens into subTokens of some superToken
     *
     * @param {BaseToken} src
     * @param {BaseToken} tar
     */

  }, {
    key: 'combine',
    value: function combine(src, tar) {

      if (!(src instanceof BaseToken) || !(tar instanceof BaseToken)) throw new NxError('unable to combine: src and tar must both be tokens');

      if (src.isSuperToken || tar.isSuperToken) throw new NxError('unable to combine: cannot combine superTokens');

      if (src.name === 'SubToken' || tar.name === 'SuperToken') throw new NxError('unable to combine: cannot combine subTokens');

      if (Math.abs(tar.indices.absolute - src.indices.absolute) > 1) throw new NxError('unable to combine: tokens too far apart');

      // get a new token to put things into
      var superToken = new Token(this, {});
      superToken._analyses = [new Analysis(this, { subTokens: [] })];
      superToken._i = 0;

      // get the new superToken form from the subTokens
      superToken.form = (src.form || '') + (tar.form || '') || null;

      // make new subToken objects from src and tar
      var _src = new SubToken(this, {});

      // basic copying
      _src.semicolon = src.semicolon;
      _src.isEmpty = src.isEmpty;
      _src.form = src.form;
      _src.lemma = src.lemma;
      _src.upostag = src.upostag;
      _src.xpostag = src.xpostag;

      // array-type copying
      _src._feats_init = src._feats_init;
      _src._feats = _src._feats_init ? src._feats.slice() : undefined;
      _src._misc_init = src._misc_init;
      _src._misc = _src._misc_init ? src._misc.slice() : undefined;

      // make new subToken objects from src and tar
      var _tar = new SubToken(this, {});

      // basic copying
      _tar.semicolon = tar.semicolon;
      _tar.isEmpty = tar.isEmpty;
      _tar.form = tar.form;
      _tar.lemma = tar.lemma;
      _tar.upostag = tar.upostag;
      _tar.xpostag = tar.xpostag;

      // array-type copying
      _tar._feats_init = tar._feats_init;
      _tar._feats = _tar._feats_init ? tar._feats.slice() : undefined;
      _tar._misc_init = tar._misc_init;
      _tar._misc = _tar._misc_init ? tar._misc.slice() : undefined;

      if (src.indices.absolute < tar.indices.absolute) {

        superToken.analysis._subTokens.push(_src, _tar);
      } else {

        superToken.analysis._subTokens.push(_tar, _src);
      }

      // remove within-superToken dependencies
      src.removeHead(tar);
      tar.removeHead(src);

      // transfer all the heads and dependents to the new subTokens
      src.mapHeads(function (head) {
        src.removeHead(head.token);
        _src.addHead(head.token, head.deprel);
      });

      src.mapDependents(function (dep) {
        dep.token.removeHead(src);
        dep.token.addHead(_src, dep.deprel);
      });

      tar.mapHeads(function (head) {
        tar.removeHead(head.token);
        _tar.addHead(head.token, head.deprel);
      });

      tar.mapDependents(function (dep) {
        dep.token.removeHead(tar);
        dep.token.addHead(_tar, dep.deprel);
      });

      // overwrite the src with the new token
      this.tokens[src.indices.sup] = superToken;

      // splice out the old target
      this.tokens.splice(tar.indices.sup, 1);

      return this.index();
    }

    /**
     * Split a given token into two tokens.  If the given token is a
     *  superToken, make each of its subTokens into a regular token and
     *  delete the superToken.  Otherwise, split the token at the given
     *  index.
     *
     * @param {BaseToken} src
     * @param {Number} splitAtIndex
     */

  }, {
    key: 'split',
    value: function split(src, splitAtIndex) {
      var _this2 = this;

      if (!(src instanceof BaseToken)) throw new NxError('unable to split: src must be a token');

      if (src.isSuperToken) {

        var tokens = src.subTokens.map(function (subToken) {

          var token = new Token(_this2, {});

          // basic copying
          token.semicolon = subToken.semicolon;
          token.isEmpty = subToken.isEmpty;
          token.form = subToken.form;
          token.lemma = subToken.lemma;
          token.upostag = subToken.upostag;
          token.xpostag = subToken.xpostag;

          // array-type copying
          token._feats_init = subToken._feats_init;
          token._feats = (subToken._feats || []).slice();
          token._misc_init = subToken._misc_init;
          token._misc = (subToken._misc || []).slice();

          // transfer all the heads and dependents from subToken to token
          subToken.mapHeads(function (head) {
            subToken.removeHead(head.token);
            token.addHead(head.token, head.deprel);
          });

          subToken.mapDependents(function (dep) {
            dep.token.removeHead(subToken);
            dep.token.addHead(token, dep.deprel);
          });

          return token;
        });

        var index = src.indices.sup;

        // splice out the old superToken
        this.tokens.splice(index, 1);

        // insert the new tokens into its place
        this.tokens = this.tokens.slice(0, index).concat(tokens).concat(this.tokens.slice(index));
      } else if (src.name === 'SubToken') {

        splitAtIndex = parseInt(splitAtIndex);
        if (isNaN(splitAtIndex)) throw new NxError('unable to split: cannot split at index ' + splitAtIndex);

        var subToken = new SubToken(this, {});

        var beginning = (src.form || '').slice(0, splitAtIndex) || '_';
        var ending = (src.form || '').slice(splitAtIndex) || '_';

        src.form = beginning;
        subToken.form = ending;

        var superToken = this.getSuperToken(src);
        var subTokens = superToken._analyses[src.indices.ana]._subTokens;
        var _index = src.indices.sub;

        // insert the new subToken after it
        superToken._analyses[src.indices.ana]._subTokens = subTokens.slice(0, _index + 1).concat(subToken).concat(subTokens.slice(_index + 1));
      } else {

        splitAtIndex = parseInt(splitAtIndex);
        if (isNaN(splitAtIndex)) throw new NxError('unable to split: cannot split at index ' + splitAtIndex);

        var token = new Token(this, {});

        var _beginning = (src.form || '').slice(0, splitAtIndex) || '_';
        var _ending = (src.form || '').slice(splitAtIndex) || '_';

        src.form = _beginning;
        token.form = _ending;

        var _index2 = src.indices.sup;

        // insert the new token after it
        this.tokens = this.tokens.slice(0, _index2 + 1).concat(token).concat(this.tokens.slice(_index2 + 1));
      }

      return this.index();
    }
  }]);

  return Sentence;
}(NxBaseClass);

module.exports = Sentence;

},{"../generator":73,"../parser":89,"../utils":94,"./analysis":75,"./base-class":76,"./base-token":77,"./comment":78,"./root-token":84,"./sub-token":86,"./token":87,"./update":88,"underscore":14}],86:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ = require('underscore');

var utils = require('../utils');
var BaseToken = require('./base-token');

var SubToken = function (_BaseToken) {
  _inherits(SubToken, _BaseToken);

  function SubToken(sent, serial) {
    _classCallCheck(this, SubToken);

    return _possibleConstructorReturn(this, (SubToken.__proto__ || Object.getPrototypeOf(SubToken)).call(this, sent, 'SubToken', serial));
  }

  return SubToken;
}(BaseToken);

module.exports = SubToken;

},{"../utils":94,"./base-token":77,"underscore":14}],87:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ = require('underscore');

var utils = require('../utils');
var BaseToken = require('./base-token');
var Analysis = require('./analysis');

var Token = function (_BaseToken) {
  _inherits(Token, _BaseToken);

  function Token(sent, serial) {
    _classCallCheck(this, Token);

    var _this = _possibleConstructorReturn(this, (Token.__proto__ || Object.getPrototypeOf(Token)).call(this, sent, 'Token', serial));

    _this._analyses = (serial.analyses || []).map(function (ana) {
      return new Analysis(sent, ana);
    });
    _this._i = _this._analyses.length ? 0 : null;

    return _this;
  }

  _createClass(Token, [{
    key: 'analysis',
    get: function get() {
      if (this._i === null) return null;

      return this._analyses[this._i];
    }
  }, {
    key: 'subTokens',
    get: function get() {
      return this.analysis ? this.analysis.subTokens : [];
    }
  }]);

  return Token;
}(BaseToken);

module.exports = Token;

},{"../utils":94,"./analysis":75,"./base-token":77,"underscore":14}],88:[function(require,module,exports){
'use strict';

var _ = require('underscore');

var utils = require('../utils');
var NxError = utils.NxError;
var formats = require('../formats');
var detect = require('../detector');

function debug(show) {
  var _console;

  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  if (show) (_console = console).log.apply(_console, ['d>'].concat(args));
}

function compareFields(fields, t1, t2, maxDistance) {
  debug(false, 'comparing fields at maxDistance: ' + maxDistance);

  /*
  const compare = field => {
    debug(false, `comparing "${field}" (${t1[field]}, ${t2[field]})`);
     if (field === 'analyses' && (t1._analyses || t2._analyses)) {
       console.log('analyses', t1.analyses === t2.analyses, t1._analyses);
     } else if (field === 'head') {
       let unmatched = {
        old: new Set(),
        new: new Set(),
      };
      let matched = {
        old: new Set(),
        new: new Set(),
      };
      t1.mapHeads((h1, d1) => {
        t2.mapHeads((h2, d2) => {
         });
      });
       console.log('head', t1._heads.toString('serial', 'dep'), t2._heads.toString('serial', 'dep'));
     } else if (field === 'deps') {
       console.log('deps', t1._deps.toString('serial', 'dep'), t2._deps.toString('serial', 'dep'));
     } else if (t1[field] !== t2[field]) {
      if (field === 'analyses') {
         console.log(t1.analyses, t2.analyses)
       }
      //console.log(field, t1.indices.absolute, t2.indices.absolute)
      distance += 1;
    }
  }
  */

  var distance = 0;

  fields = fields.filter(function (field) {
    return t1[field] !== undefined;
  });
  var combinations = utils.combine(fields, fields.length - maxDistance);

  [].forEach(function (combination) {});

  return distance;

  console.log(fields, utils.combine(fields, fields.length - maxDistance));

  var h1 = t1.hashFields(fields, 'indices'),
      h2 = t2.hashFields(fields, 'indices');

  if (h1 === h2) return true;

  console.log();
  console.log('h1', h1);
  console.log('h2', h2);
  console.log();
  return false;

  debug(false, 'distance: ' + distance);
  return distance <= maxDistance;
}

function compareIndices(_arg, t1, t2, maxDistance) {
  debug(false, 'comparing fields at maxDistance: ' + maxDistance);

  var distance = 0;
  ['conllu', 'cg3', 'cytoscape', 'absolute'].forEach(function (indexName) {

    debug(false, 'comparing "' + indexName + '" (' + t1.indices[indexName] + ', ' + t2.indices[indexName] + ')');
    if (t1.indices[indexName] !== t2.indices[indexName]) distance += 1;
  });

  debug(false, 'distance: ' + distance);
  return distance <= maxDistance;
}

function updateToken(fields, t1, t2) {
  debug(false, 'updating');

  fields.forEach(function (field) {
    debug(false, 'trying to update "' + field + '"');

    switch (field) {
      case 'subTokens':
        if (t1.subTokens.length || t2.subTokens.length) {
          throw new Error('not implemented');
        } else {
          // pass
        }
        break;

      default:
        debug(false, 'updating (' + t1[field] + ' => ' + t2[field] + ')');
        t1[field] = t2[field];
    }
  });
}

function getDistance(fields, t1, t2) {

  fields = fields.filter(function (field) {
    return t1[field] !== undefined;
  });
  for (var dist = 0; dist < fields.length; dist++) {

    var match = false;
    utils.combine(fields, fields.length - dist).forEach(function (comb) {

      var hash1 = t1.hashFields(comb),
          hash2 = t2.hashFields(comb);

      if (hash1 === hash2) match = true;
    });

    if (match) return dist;
  }
  return Infinity;
}

function getMatches(s, t) {
  for (var _len2 = arguments.length, fields = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
    fields[_key2 - 2] = arguments[_key2];
  }

  fields = _.flatten(fields);

  var s_unmatched = new Set(s.map(function (token) {
    return '' + token.indices.absolute;
  }));
  var t_unmatched = new Set(t.map(function (token) {
    return '' + token.indices.absolute;
  }));

  // build distances between nodes
  var rawDistances = {};
  s.forEach(function (t1) {

    var i1 = t1.indices.absolute;
    rawDistances[i1] = {};

    t.forEach(function (t2) {

      var i2 = t2.indices.absolute;
      rawDistances[i1][i2] = getDistance(fields, t1, t2);
    });
  });

  //console.log(rawDistances);

  var neighbors = {};
  _.each(rawDistances, function (targets, source) {

    neighbors[source] = [];

    var min = Infinity;
    _.each(targets, function (distance) {
      min = Math.min(distance, min);
    });
    if (min < Infinity) _.each(targets, function (distance, target) {
      if (distance === min) neighbors[source].push(target);
    });
  });

  //console.log(neighbors);

  var lookup = function lookup(prefix, index) {
    return key[prefix + '_' + index];
  };

  var matches = new Set();

  _.each(neighbors, function (neighbors, index) {
    if (neighbors.length === 1) {

      matches.add(['' + index, '' + neighbors[0]]);
      s_unmatched.delete('' + index);
      t_unmatched.delete('' + neighbors[0]);
    }
  });

  return {
    matches: matches,
    s_unmatched: s_unmatched,
    t_unmatched: t_unmatched
  };
}

function updateMatches(s_key, t_key, matches, fields) {

  matches.forEach(function (match) {

    var s_token = s_key[match[0]];
    var t_token = t_key[match[1]];
    //console.log('updating', match[0], match[1]);

    fields.forEach(function (field) {

      switch (field) {
        case 'analyses':

          //console.log('begin analyses evaluations');
          if (s_token._analyses === undefined || t_token.analyses === undefined) break;

          var s_analyses = s_token._analyses.slice();
          var t_analyses = t_token._analyses.slice();

          for (var i = 0; i < s_analyses.length; i++) {
            matchAndUpdate(s_key, s_analyses[i]._subTokens, t_key, t_analyses[i]._subTokens, fields);
          } //console.log('end anlyses evaluations');

          break;

        case 'subTokens':

          //console.log('begin subToken evaluations');
          if (s_token._analyses === undefined || t_token.analyses === undefined) break;

          var s = s_token.subTokens.slice();
          var t = t_token.subTokens.slice();
          matchAndUpdate(s_key, s, t_key, t, fields);
          //console.log('end subToken evaluations');

          break;

        default:
          //if (s_token[field] !== t_token[field])
          //console.log('change!!!', field, s_token[field], t_token[field]);
          s_token[field] = t_token[field];
      }
    });
  });
}

function matchAndUpdate(s_key, s, t_key, t, fields) {

  //console.log('matching on fields');
  var m = getMatches(s, t, fields);
  //console.log(m);
  updateMatches(s_key, t_key, m.matches, fields);

  if (m.s_unmatched.size || m.t_unmatched.size) {

    var _s = [],
        _t = [];

    m.s_unmatched.forEach(function (i) {
      return _s.push(s_key[i]);
    });
    m.t_unmatched.forEach(function (i) {
      return _t.push(t_key[i]);
    });

    //console.log('matching on fields and indices')
    var m2 = getMatches(_s, _t, fields, 'indices');
    //console.log(m2);
    updateMatches(s_key, t_key, m2.matches, fields);

    if (m2.s_unmatched.size || m2.t_unmatched.size) {

      throw new Error('unable to find match');
    }
  }
}

module.exports = function (original, update, options) {

  debug(false, 'original input:', original.input);
  debug(false, 'update input:', update.input);

  // the input format of the new guy
  var format = detect(update.input, _.extend({
    requireOneFormat: true
  }, options));
  debug(false, 'detected update as format:', format);
  format = formats[format];

  /*
  let unmatched = {
    old: new Set(),
    new: new Set(),
  };
  let matched = {
    old: new Set(),
    new: new Set(),
  };
  */

  if (format.hasComments) {
    debug(false, '\n\ncomparing comments\n');
    var i = 0,
        j = 0;
    while (data.comments.new.unmatched.size) {

      throw new Error('not implemented');

      /*
      const s1Comment = this.comments[i];
      const s2Comment = sent.comments[i];
       if (commentsEqual(s1Comment, s2Comment)) {
        throw new Error('not implemented')
      } else {
        throw new Error('not implemented')
      }
      */
    }
  } else {
    debug(false, 'using original comments');
    // don't change anything
  }

  // build a hash table and a list of tokens for each sentence
  var s_key = {},
      s = [],
      t_key = {},
      t = [];

  original.iterate(function (token) {

    s_key[token.indices.absolute] = token;
    s.push(token);
  });
  update.iterate(function (token) {

    t_key[token.indices.absolute] = token;
    t.push(token);
  });

  // try to find matches between the items
  matchAndUpdate(s_key, s, t_key, t, format.fields);

  return;
};

/*

  const iterate = (predicate, dist) => {
    debug(true, 'iterating at distance', dist);

    original.iterate(t1 => {
      update.iterate(t2 => {

        if (!matched.old.has(t1) && !matched.new.has(t2))
          if (predicate(format.fields, t1, t2, dist)) {

            debug(false, 'same', t1.form, t2.form);
            matched.old.add(t1);
            matched.new.add(t2);
            unmatched.old.delete(t1);
            unmatched.new.delete(t2);
            updateToken(format.fields, t1, t2);

          } else {

            debug(false, 'different', t1.form, t2.form);
            unmatched.old.add(t1);
            unmatched.new.add(t2);

          }

      });
    });
  };

  debug(false, )
  debug(true, `comparing tokens on fields to find exact matches`);
  iterate(compareFields, 0);

  if (!unmatched.old.size && !unmatched.new.size)
    return;

  debug(false, )
  debug(true, `comparing tokens on fields to find close matches`);
  for (let i=1; i<format.fields.length; i++) {

    iterate(compareFields, i);
    if (!unmatched.old.size && !unmatched.new.size)
      return;

  }

  unmatched.old.forEach(e => debug(true, e.indices));
  unmatched.new.forEach(e => debug(true, e.indices));

  debug(false, )
  debug(true, `comparing tokens on indices to find close matches`);
  for (let i=0; i<4; i++) {

    iterate(compareIndices, i);
    if (!unmatched.old.size && !unmatched.new.size)
      return;

  }

  debug(true, unmatched);
  throw new Error('can\'t find a match');
};

  /*

  let distance = 0;
  while (data.tokens.new.unmatched.size) {
    debug()
    debug(`\tevaluating at maxDistance: ${distance}`);
    debug()

    for (let i=0; i<data.old.tokens.length; i++) {
      for (let j=0; j<data.new.tokens.length; j++) {

        if (data.tokens.old.unmatched.has(i) && data.tokens.new.unmatched.has(j))
          if (compareFields(data, i, j, distance)) {
            debug('same');

            data.tokens.old.unmatched.delete(i);
            data.tokens.old.matched.add(i);
            data.tokens.new.unmatched.delete(j);
            data.tokens.new.matched.add(j);

            updateToken(data, i, j);

          } else {
            debug('different');
          }

      }
    }

    distance++;
  }

  return data;
};


/*


// some helper functions

function commentsEqual(c1, c2) {
  throw new Error('not implemented');
}

function tokensIdentical(t1, t2) {

  let matches = 0,
    mismatches = 0;

  newFormat.fields.forEach(field => {

    debug(`comparing "${field}" (1: "${t1[field]}", 2: "${t2[field]}")`);
    if (t1[field] === t2[field]) {
      matches += 1;
    } else {
      mismatches += 1;
    }
  });

  debug(matches, mismatches);

  if (matches > 0 && mismatches === 0) {
    debug('tokens equal')
    return true;
  }
}

function updateToken(t1, t2) {
  newFormat.fields.forEach(field => {
    debug(`updating "${field}" : "${t1[field]}" => "${t2[field]}"`)
    t1[field] = t2[field];
  });
}


// the new guy

const numComments = Math.max(this.comments.length, sent.comments.length);
if (newFormat.hasComments) {
  debug('comparing comments');
  for (let i=0; i<numTokens; i++) {
    const s1Comment = this.comments[i];
    const s2Comment = sent.comments[i];

    if (commentsEqual(s1Comment, s2Comment)) {
      throw new Error('not implemented')
    } else {
      throw new Error('not implemented')
    }
  }
} else {
  debug('using original comments');
  // don't change anything
}

debug('comparing tokens');
const numTokens = Math.max(this.tokens.length, sent.tokens.length);
let i1 = 0,
  oldMatches = new Set();
  i2 = 0,
  newMatches = new Set();

while (i1 < numTokens && i2 < numTokens) {

  const t1 = this.tokens[i1];
  const t2 = sent.tokens[i2];

  if (tokensIdentical(t1, t2)) {

    debug(`updating (${i1}, ${i2})`);
    oldMatches.add(i1);
    newMatches.add(i2);
    updateToken(t1, t2);

  } else {



  }

  i1++;
  i2++;
}


*/

},{"../detector":19,"../formats":45,"../utils":94,"underscore":14}],89:[function(require,module,exports){
'use strict';

var _ = require('underscore');

var utils = require('./utils');
var ParserError = utils.ParserError;

var as = {

	'apertium stream': require('./formats/apertium-stream').parse,
	apertiumStream: require('./formats/apertium-stream').parse,
	Brackets: require('./formats/brackets').parse,
	brackets: require('./formats/brackets').parse,
	CG3: require('./formats/cg3').parse,
	cg3: require('./formats/cg3').parse,
	'CoNLL-U': require('./formats/conllu').parse,
	conllu: require('./formats/conllu').parse,
	'notatrix serial': require('./formats/notatrix-serial').parse,
	notatrixSerial: require('./formats/notatrix-serial').parse,
	Params: require('./formats/params').parse,
	params: require('./formats/params').parse,
	'plain text': require('./formats/plain-text').parse,
	plainText: require('./formats/plain-text').parse,
	SD: require('./formats/sd').parse,
	sd: require('./formats/sd').parse

};

module.exports = function (text, options) {

	options = _.defaults(options, {
		suppressDetectorErrors: true,
		suppressParserErrors: true,
		returnAllPossibilities: true,
		requireOne: false
	});

	var possibilities = utils.formats.map(function (format) {

		try {
			return as[format](text, options);
		} catch (e) {

			if (e instanceof ParserError && options.suppressParserErrors) return;

			throw e;
		}
	}).filter(utils.thin);

	if (!possibilities.length && !options.suppressDetectorErrors) throw new ParserError('Unable to detect format', text, options);

	if (options.requireOne && possibilities.length > 1) throw new ParserError('Unable to detect, ambiguous input');

	return options.returnAllPossibilities ? possibilities : possibilities[0];
};
module.exports.as = as;

},{"./formats/apertium-stream":23,"./formats/brackets":30,"./formats/cg3":36,"./formats/conllu":42,"./formats/notatrix-serial":50,"./formats/params":57,"./formats/plain-text":64,"./formats/sd":71,"./utils":94,"underscore":14}],90:[function(require,module,exports){
'use strict';

var _ = require('underscore');

var utils = require('./utils');
var defaultSplitter = require('./formats/default-splitter');
var detector = require('./detector');
var SplitterError = utils.SplitterError;

var as = {

	'apertium stream': require('./formats/apertium-stream').split,
	apertiumStream: require('./formats/apertium-stream').split,
	Brackets: require('./formats/brackets').split,
	brackets: require('./formats/brackets').split,
	CG3: require('./formats/cg3').split,
	cg3: require('./formats/cg3').split,
	'CoNLL-U': require('./formats/conllu').split,
	conllu: require('./formats/conllu').split,
	'notatrix serial': require('./formats/notatrix-serial').split,
	notatrixSerial: require('./formats/notatrix-serial').split,
	Params: require('./formats/params').split,
	params: require('./formats/params').split,
	'plain text': require('./formats/plain-text').split,
	plainText: require('./formats/plain-text').split,
	SD: require('./formats/sd').split,
	sd: require('./formats/sd').split

};

module.exports = function (text, options) {

	var fromDefault = new Set();
	var splitAsDefault = defaultSplitter(text, options);
	splitAsDefault.forEach(function (line) {
		detector(line, options).forEach(function (format) {
			return fromDefault.add(format);
		});
	});

	var fromPlainText = new Set();
	var splitAsPlainText = as.plainText(text, options);
	splitAsPlainText.forEach(function (line) {
		detector(line, options).forEach(function (format) {
			return fromPlainText.add(format);
		});
	});

	if (fromDefault.size !== 1 && fromPlainText.size === 1 && fromPlainText.has('plain text')) return splitAsPlainText;

	return splitAsDefault;
};
module.exports.as = as;
module.exports.onNewlines = require('./formats/default-splitter');

},{"./detector":19,"./formats/apertium-stream":23,"./formats/brackets":30,"./formats/cg3":36,"./formats/conllu":42,"./formats/default-splitter":44,"./formats/notatrix-serial":50,"./formats/params":57,"./formats/plain-text":64,"./formats/sd":71,"./utils":94,"underscore":14}],91:[function(require,module,exports){
'use strict';

module.exports = {

  fields: ['index', 'form', 'lemma', 'upostag', 'xpostag', 'feats', 'head', 'deprel', 'deps', 'misc'],

  formats: [
  //'apertium stream',
  'Brackets', 'CG3', 'CoNLL-U', 'notatrix serial', 'Params', 'plain text', 'SD'],

  nxSentenceFields: {
    input: 'string',
    options: 'object',
    comments: 'array',
    tokens: 'array'
  },

  nxSentenceTokensFields: {
    semicolon: 'boolean',
    isEmpty: 'boolean',
    index: 'number',
    form: 'string*',
    lemma: 'string*',
    upostag: 'string*',
    xpostag: 'string*',
    feats: 'array',
    heads: 'array',
    analyses: 'array'
  },

  nxAllOptions: {},

  fallback: '_',

  hexConstant: 16777215 // = 0xffffff

};

},{}],92:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NotatrixError = function (_Error) {
  _inherits(NotatrixError, _Error);

  function NotatrixError() {
    _classCallCheck(this, NotatrixError);

    return _possibleConstructorReturn(this, (NotatrixError.__proto__ || Object.getPrototypeOf(NotatrixError)).apply(this, arguments));
  }

  return NotatrixError;
}(Error);

;

var ToolError = function (_NotatrixError) {
  _inherits(ToolError, _NotatrixError);

  function ToolError() {
    _classCallCheck(this, ToolError);

    return _possibleConstructorReturn(this, (ToolError.__proto__ || Object.getPrototypeOf(ToolError)).apply(this, arguments));
  }

  return ToolError;
}(NotatrixError);

;

var SplitterError = function (_ToolError) {
  _inherits(SplitterError, _ToolError);

  function SplitterError(message, text, options) {
    _classCallCheck(this, SplitterError);

    var _this3 = _possibleConstructorReturn(this, (SplitterError.__proto__ || Object.getPrototypeOf(SplitterError)).call(this, message));

    _this3.name = 'SplitterError';
    _this3.text = text;
    _this3.options = options;
    return _this3;
  }

  return SplitterError;
}(ToolError);

var DetectorError = function (_ToolError2) {
  _inherits(DetectorError, _ToolError2);

  function DetectorError(message, text, options) {
    _classCallCheck(this, DetectorError);

    var _this4 = _possibleConstructorReturn(this, (DetectorError.__proto__ || Object.getPrototypeOf(DetectorError)).call(this, message));

    _this4.name = 'DetectorError';
    _this4.text = text;
    _this4.options = options;
    return _this4;
  }

  return DetectorError;
}(ToolError);

var ParserError = function (_ToolError3) {
  _inherits(ParserError, _ToolError3);

  function ParserError(message, text, options) {
    _classCallCheck(this, ParserError);

    var _this5 = _possibleConstructorReturn(this, (ParserError.__proto__ || Object.getPrototypeOf(ParserError)).call(this, message));

    _this5.name = 'ParserError';
    _this5.text = text;
    _this5.options = options;
    return _this5;
  }

  return ParserError;
}(ToolError);

var GeneratorError = function (_ToolError4) {
  _inherits(GeneratorError, _ToolError4);

  function GeneratorError(message, nx, options) {
    _classCallCheck(this, GeneratorError);

    var _this6 = _possibleConstructorReturn(this, (GeneratorError.__proto__ || Object.getPrototypeOf(GeneratorError)).call(this, message));

    _this6.name = 'GeneratorError';
    _this6.nx = nx;
    _this6.options = options;
    return _this6;
  }

  return GeneratorError;
}(ToolError);

var ConverterError = function (_ToolError5) {
  _inherits(ConverterError, _ToolError5);

  function ConverterError(message) {
    _classCallCheck(this, ConverterError);

    var _this7 = _possibleConstructorReturn(this, (ConverterError.__proto__ || Object.getPrototypeOf(ConverterError)).call(this, message));

    _this7.name = 'ConverterError';
    return _this7;
  }

  return ConverterError;
}(ToolError);

var NxError = function (_NotatrixError2) {
  _inherits(NxError, _NotatrixError2);

  function NxError() {
    var _ref;

    _classCallCheck(this, NxError);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this8 = _possibleConstructorReturn(this, (_ref = NxError.__proto__ || Object.getPrototypeOf(NxError)).call.apply(_ref, [this].concat(args)));

    _this8.name = 'NxError';
    return _this8;
  }

  return NxError;
}(NotatrixError);

var DBError = function (_NotatrixError3) {
  _inherits(DBError, _NotatrixError3);

  function DBError() {
    _classCallCheck(this, DBError);

    return _possibleConstructorReturn(this, (DBError.__proto__ || Object.getPrototypeOf(DBError)).apply(this, arguments));
  }

  return DBError;
}(NotatrixError);

;

module.exports = {

  NotatrixError: NotatrixError,

  ToolError: ToolError,
  SplitterError: SplitterError,
  DetectorError: DetectorError,
  ParserError: ParserError,
  GeneratorError: GeneratorError,
  ConverterError: ConverterError,

  NxError: NxError,
  DBError: DBError

};

},{}],93:[function(require,module,exports){
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _ = require('underscore');
var constants = require('./constants');
var re = require('./regex');

function combine(arr, k) {

  if (k > arr.length || k <= 0) return [];

  if (k === arr.length) return [arr];

  if (k === 1) return arr.map(function (e) {
    return [e];
  });

  var combs = [];

  var _loop = function _loop(i) {

    var head = arr.slice(i, i + 1);
    var tailCombs = combine(arr.slice(i + 1), k - 1);
    tailCombs.forEach(function (tailComb) {
      combs.push(head.concat(tailComb));
    });
  };

  for (var i = 0; i < arr.length - k + 1; i++) {
    _loop(i);
  }
  return combs;
}

function hexToRGB(hex) {
  var match = hex.match(re.hexColor);

  if (match) return [parseInt(match[1], 16), parseInt(match[2], 16), parseInt(match[3], 16)];
}

module.exports = {

  isJSONSerializable: function isJSONSerializable(obj) {

    if (typeof obj === 'string') {

      try {
        JSON.parse(obj);
      } catch (e) {
        return false;
      }
    } else {

      try {
        JSON.stringify(obj);
      } catch (e) {
        return false;
      }
    }

    return true;
  },

  noop: function noop(arg) {
    return arg;
  },

  thin: function thin(arg) {
    return !!arg ? arg : undefined;
  },

  combine: combine,

  guessDeprel: function guessDeprel(dependent, head, context) {
    return undefined;
  },

  dedup: function dedup(master, slave) {

    var dedup = {};

    _.each(slave, function (value, key) {
      if (master[key] !== value) dedup[key] = value;
    });

    return dedup;
  },

  hashStringToHex: function hashStringToHex(string) {
    var hash = 0;
    for (var i = 0; i < string.length; i++) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    var hex = '';
    for (var _i = 0; _i < 3; _i++) {
      var value = hash >> _i * 8 & 0xFF;
      hex += ('00' + value.toString(16)).substr(-2);
    }
    return hex;
  },

  getRandomHexColor: function getRandomHexColor() {

    var color = '';
    do {
      color = Math.floor(Math.random() * constants.hexConstant).toString(16);
    } while (color.length !== 7);

    return color;
  },

  hexToRGB: hexToRGB,

  getContrastingColor: function getContrastingColor(background) {

    var color = 'ffffff';

    var rgb = hexToRGB(background);
    if (!rgb) return color;

    var _rgb = _slicedToArray(rgb, 3),
        r = _rgb[0],
        g = _rgb[1],
        b = _rgb[2];

    if (Math.pow(r, 2) + Math.pow(g, 2) + Math.pow(b, 2) > Math.pow(255 - r, 2) + Math.pow(255 - g, 2) + Math.pow(255 - b, 2)) color = '000000';

    return color;
  }

};

},{"./constants":91,"./regex":95,"underscore":14}],94:[function(require,module,exports){
'use strict';

var _ = require('underscore');

var constants = require('./constants');
var errors = require('./errors');
var funcs = require('./funcs');
var regex = require('./regex');

module.exports = _.extend({ re: regex }, errors, constants, funcs);

},{"./constants":91,"./errors":92,"./funcs":93,"./regex":95,"underscore":14}],95:[function(require,module,exports){
"use strict";

module.exports = {

  multiNewlines: /\n{2,}/g,
  punctuation: /[.,!?;]+/g,
  allPunctuation: /^[.,!?;]+$/,
  sentenceThenPunctuation: /([^.!?]*[.!?]*)/g,
  spaceBeforePunctuation: /\s+([.,!?;]+)/g,
  comment: /^(#\s*(.*))(\n|$)/,
  conlluTokenLine: /^((\d+(\.\d+)?)(\-(\d+(\.\d+)?))?)(.+)/,
  conlluTokenLineTenParams: /^((\d+(\.\d+)?)(\-(\d+(\.\d+)?))?)((\s+\S+){8,9})/,
  conlluEmptyIndex: /^(\d+)(\.\d+)?/,
  cg3TokenStart: /^["']<((.|\\")*)>["']/,
  cg3TokenContent: /^(;?)(\s+)"((.|\\")*)"(([ \t]+\S+)*)/,
  cg3Dependency: /#?\d+(->\d*)?$/,
  cg3Head: /#\d+->(\d*)$/,
  cg3Index: /#(\d+)/,
  cg3Deprel: /\s@([\w:]*)/,
  cg3Other: /([^;].*(:.+)?)/,
  whitespace: /(\s+)/,
  whitespaceLine: /^(\s*)$/,
  whiteline: /^(\s*)(\n|$)/,
  sdDependency: /^\s*([\w.]+)\(([\w.]+),\s*([\w.]+)\)\s*$/,
  sdDependencyNoWhitespace: /^([\w.]+)\(([\w.]+),\s*([\w.]+)\)$/,
  fallback: /^_$/,
  commentLabel: /(\s*)(labels?|tags?)\s*=\s*(\w.*)/,
  commentSentId: /(\s*)sent.?id\s*=\s*(\w*)/i,

  hexColor: /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i,
  hexColorSixDigit: /^#?([a-f\d]{6})/i

};

},{}]},{},[74])(74)
});
