import React from 'react'
import { Container, Row, Col, Image } from 'react-bootstrap'

const AboutView = () => {

	const respStyle = {
		height:'auto',
		width:'100%'
	}

	const floatLeft = {
		height:'auto',
		width:'100%',
		maxWidth: '25em',
		float: 'left'
	}

	const floatRight = {
		height:'auto',
		width:'100%',
		maxWidth: '25em',
		float: 'right'
	}

	return (
		<Container className="pt-5">
			<Row className="d-flex justify-content-center">
				<Col xs={12}>
					<h1 className="text-center py-4 custom-font">
						Історія
					</h1>
				</Col>

				<Col xs={12} className="about-quote custom-font">
					<p className="text-center">
						<em>Музика, не згадуючи ні npo що, може сказати все.</em>
					</p>
					<p className="text-right">
						<em>
							<strong>
								І. Г. Еренбург
							</strong>
						</em>
					</p>
				</Col>

				<Col xs={12}>
					<p className="about-text">
						Позаду 40 років діяльності навчального закладу і багата історія перших
						починань та досягнень. Ми з гордістю і великою шаною згадуємо людей,
						які стояли на першоджерелах музичної школи і передали свій талант
						майбутнім поколінням. Історія заснування Шпитьківськоі школи мистецтв
						починається з відкриття в селі Шпитьки філії Бузівської музичної школи,
						яку очолював Вишнівський Віталій Миколайович. У 1978 році у західній
						частині села, де знаходився парк садиби Олександра Терещенка і зростало
						багато вікових дерев, у будівлі, де спочатку розміщувалася сільська рада,
						а потім молодша загальноосвітня школа, управлінням культури було прийнято
						рішення відкрити у великому, на той час, приміщенні &mdash; Шпитьківську
						музичну школу. Керівником призначено Литвина Андрія Васильовича, а його
						заступником з навчально-виховноі роботи &mdash; Розарьонову Тетяну Василівну.
					</p>

					<Image
						src="img/about/aboutArtviva00.jpg"
						style={respStyle}
						className="pb-2"
						alt="Групове фото складу школи"
					/>

					<p className="about-text">
						На початку діяльності у школі займалося 55 учнів. Протягом п&apos;яти років
						було відкрито нові класи, а також філія у селі Білогородка, яка працювала на
						базі будинку культури. Розповідаючи про історію школи, не можна обійти своєю
						увагою той факт, що саме тут 35 років тому працював викладачем по класу
						віолончелі 3авальський Олександр Андрійович &mdash; зірковий батько співачок
						Аліни та Анни Завальських (дует «Алібі»).
					</p>

					<Image
						src="img/about/aboutArtviva01.jpg"
						style={respStyle}
						className="pb-2"
						alt="Виїзний концерт на підприємстві"
					/>
					<p className="about-text">
						З 1984 року школу очолила Щербак Неля Юріївна, посаду заступника з
						навчально-виховної роботи зайняла Романчишина Людмила Іванівна. Кабінет
						директора школи знаходився в Білогородській філії, так як Неля Юріївна була
						жителькою цього села. Можливо, тому за часів її керівництва цей осередок
						естетичного виховання набув найбільшого розквіту. Школа опанувала нові форми і
						методи навчання, учні досягали високих результатів. Навчання велось у класах
						фортепіано, скрипки, бандури, баяна, акордеона, духових інструментів. За двадцять
						років господарювання на високому рівні був відділ народних інструментів,
						створювалися ансамблі, відкриті філії в селах Гореничі та Дмитрівка. Учні разом
						з викладачами їздили з благодійними концертами в поля, на ферми, тепличні комплекси.
					</p>
				</Col>

				<Col xs={12}>
					<Image
						src="img/about/aboutArtviva02.jpg"
						style={floatLeft}
						className="px-3 pb-2"
						alt="Оркестр школи перед будинком культури"
					/>
					<p className="about-text">
						Випали на долю школи і часи фінансової нестабільності, кризи, недостатнього
						забезпечення, скорочення посад, навчальних планів, навіть закриття закладу,
						але зусиллями викладачів та вихованців збереглися традиції школи і її діяльність.
						3 2004 року посаду директора зайняла Ноздріна Валентина Павлівна (2004-2006)
						разом із своїм заступником Мовчун Галиною Анатоліївною розпочали новий етап
						розвитку навчально виховного процесу. Учні та викладачі відвідували обласні
						конкурси та методичні об&apos;єднання, також високого рівня набуває сольний спів,
						було засновано оркестр духових інструментів, випускники школи вступали до вищих
						музичних закладів.
					</p>
				</Col>

				<Col xs={12}>
					<Image
						src="img/about/aboutArtviva03.jpg"
						style={floatRight}
						className="px-3 pb-2"
						alt="Колектив перед входом в будівлю школи"
					/>
					<p className="about-text">
						За часів керівництва Ільїна Віктора Тихоновича (2006-2009), Шпитьківська музична
						школа здобула статус школи мистецтв, у зв&apos;язку з відкриттям класу хореографії
						у 2007 році. Кількість учнів школи зросла до 200 дітей. Окрім цього Віктор Тихонович
						започаткував нелегку справу - газифікування навчального закладу. Таким чином ним у
						2008 році було побудовано сучасну котельню та школа почала опалюватись природнім газом.
					</p>
				</Col>

				<Col xs={12}>
					<p className="about-text">
						3 2009 року починає свою роботу молодий, енергійний директор, досвідчений викладач
						по класу вокалу — Іванчук Олена Анатоліївна, замісником залишається незамінна
						Мовчун Галина Анатоліївна. Кількість учнів у Шпитьках та філіях сіл: Білогородка,
						Дмитрівка, Гореничі, Михайлівська Рубежівка, Музичі разом складала майже 200 чоловік.
						Першим та головним завданням на той час було створити належні умови для навчання та
						продуктивної роботи. Гострим питанням стояло облаштування санвузла в приміщенні школи.
						Як то кажуть: «Головне - почати!». За підтримки Шпитьківської сілиської ради та
						депутатів в період літніх канікул 2010 року був зроблений довгоочікуваний ремонт в
						приміщенні школи. Діти та викладачі отримали чудові світлі класи, де дуже затишно
						і приємно працювати. Згодом школу було утеплено, укомплектовано міні-котельню,
						покладені доріжки, паркан та навіть облаштовано паркінг.
					</p>
				</Col>

				<Col xs={12}>
					<Image
						src="img/about/aboutArtviva04.jpg"
						style={floatLeft}
						className="px-3 pb-2"
						alt="Завуч і директор школи"
					/>
					<p className="about-text">
						Сьогодні на території школи проходять роботи по озелененню та ландшафтному дизайну,
						встановлено автоматичний полив та насаджено багато молодих рослин та дерев, що ще
						більше надихає до роботи та розвитку Шпитьківського позашкільного закладу, як осередку
						естетичного та культурного виховання дітей. Активна робота ведеться і на філіях
						Шпитьківської школи. За підтримки районної адміністрації та Білогородського сільського
						голови 3уєва Максима, який також є випускником нашої школи по класу баяна, був
						проведений капітальний ремонт шкільної будівлі в селі Білогородка. Побудовано санвузол
						в приміщенні школи, укомплектовані всім необхідним навчальні класи, запущено
						індивідуальне опалення та водопостачання. Також загальними зусиллями із сільськими
						радами сіл Гореничі, Дмитрівка, Михайлівська Рубежівка та Бузова, де класи знаходяться
						на базі будинків культури та загальноосвітніх шкіл створені належні умови для
						комфортного навчання учнів.
					</p>
					<p className="about-text">
						Господарська робота, звичайно, не повинна заважати і
						навчально-виховному процесу. В 2011 році школа успішно пройшла атестацію.
						Відкриваються нові класи: віолончелі, блок-флейти, саксофону, флейти, клас ударних
						інструментів, декоративно-прикладного мистецтва, спортивно-бойової хореографії
						естрадно-циркового та театрального мистецтв, група раннього розвитку для наших
						маленьких учнів. Створені нові інструментальні, хореографічні та вокальні колективи:
						ансамбль гітаристів, ансамбль скрипалів «Домінанта», зведений оркестр, тріо викладачів
						«Грація», маршовий оркестр барабанщиць «DrumStarBirds», хореографічні колективи
						«Перлина» та «Blago-Dance», спортивно-бойова хореографія «Шпитьківські козачата»,
						естрадно-циркова студія «Flick-Flyack», вокальні ансамблі «Перепілонька», «Веретенце»
						та «До-Мі-Солька». Дякуючи підтримці нашого району та місцевій владі поновлюється
						матеріально-технічна база. Придбано нові інструменти: баян, фортепіано, бандури,
						гітари, скрипки, віолончелі, блок-флейти, кларнети, саксофони, барабанні установки,
						акустичні професійні системи з мікрофонами для вокального відділу, а також закуплено
						потужну професійну апаратуру, яка сьогодні дає нам змогу озвучувати великі святкові
						заходи та концерти. Колективи одягнені в яскраві концертні костюми, а художній відділ
						забезпечений мольбертами та всім необхідним знаряддям. Сучасна епоха стрімкого
						розвитку комп&apos;ютерних технологій диктує свої правила і вносить корективи в
						навчальний процес і розвиток школи. Нові ноутбуки, радіо-мікрофони, плазмові телевізори
						та багатофункціональні пристрої допомагають нам рухатись в ногу із часом.
					</p>
				</Col>
			</Row>
		</Container>
	)
}

export default AboutView
