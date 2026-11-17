import { useState, useEffect, useRef } from 'react';
import {
  MapPin,
  BedDouble,
  Bath,
  Maximize,
  Play,
  Phone,
  Mail,
  ArrowRight,
  Building2,
  CheckCircle2,
  Menu,
  X,
} from 'lucide-react';

// ============================================================================
// 1. ZONE DE CONFIGURATION DE TES FICHIERS LOCAUX (Mets tes fichiers dans /public)
// ============================================================================
const MEDIAS = {
  headerVideo: '/video-header.mp4', // <-- Remplace par le nom de ta vidéo header
  sectionVideo: '/video-visite.mp4', // <-- Remplace par le nom de ta 2ème vidéo
};

const PROPRIETES = [
  {
    id: 1,
    titre: 'Villa Contemporaine avec Piscine',
    type: 'Location',
    prix: '1 500 000 FCFA / mois',
    localisation: 'Cocody, Riviera Golf',
    chambres: 4,
    sallesDeBain: 4,
    surface: '380 m²',
    image: '/maison1.jpg', // <-- Ton image locale dans /public
    fallback: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=900&q=80',
    badge: 'Coup de cœur',
  },
  {
    id: 2,
    titre: 'Duplex Moderne Haut Standing',
    type: 'Vente',
    prix: '145 000 000 FCFA',
    localisation: 'Marcory, Zone 4',
    chambres: 5,
    sallesDeBain: 5,
    surface: '420 m²',
    image: '/maison2.jpg', // <-- Ton image locale dans /public
    fallback: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&q=80',
    badge: 'Exclusivité',
  },
  {
    id: 3,
    titre: 'Appartement Penthouse Vue Lagune',
    type: 'Location',
    prix: '850 000 FCFA / mois',
    localisation: 'Plateau, Boulevard Lagunaire',
    chambres: 3,
    sallesDeBain: 3,
    surface: '210 m²',
    image: '/maison3.jpg', // <-- Ton image locale dans /public
    fallback: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=80',
    badge: 'Nouveau',
  },
  {
    id: 4,
    titre: 'Résidence Familiale Jardin Arboré',
    type: 'Vente',
    prix: '95 000 000 FCFA',
    localisation: 'Bingerville, Cité Résidentielle',
    chambres: 4,
    sallesDeBain: 3,
    surface: '310 m²',
    image: '/maison4.jpg', // <-- Ton image locale dans /public
    fallback: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80',
    badge: 'Disponible',
  },
];

// ============================================================================
// 2. UTILITAIRE D'ANIMATION REVEAL AU DÉFILEMENT (Sans librairie externe)
// ============================================================================
function Reveal({ children, delay = 0, className = '' }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } ${className}`}
    >
      {children}
    </div>
  );
}

// ============================================================================
// 3. APPLICATION PRINCIPALE
// ============================================================================
export default function App() {
  const [filtre, setFiltre] = useState('Tout');
  const [menuOuvert, setMenuOuvert] = useState(false);
  const [bienSelectionne, setBienSelectionne] = useState(null);

  const biensFiltres =
    filtre === 'Tout'
      ? PROPRIETES
      : PROPRIETES.filter((item) => item.type === filtre);

  return (
    <div className="min-h-screen bg-stone-50 text-slate-900 font-sans selection:bg-amber-500 selection:text-white">
      {/* =================================================================== */}
      {/* BARRE DE NAVIGATION FLOTTANTE                                       */}
      {/* =================================================================== */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-slate-950/75 backdrop-blur-md border-b border-white/10 text-white">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5 text-2xl font-extrabold tracking-tight">
            <span className="p-2 rounded-xl bg-amber-500 text-slate-950">
              <Building2 className="w-6 h-6" />
            </span>
            <span>
              Prestige<span className="text-amber-400">Immo</span>
            </span>
          </a>

          {/* Liens Desktop */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-200">
            <a href="#accueil" className="hover:text-amber-400 transition">Accueil</a>
            <a href="#proprietes" className="hover:text-amber-400 transition">Acheter & Louer</a>
            <a href="#visite-video" className="hover:text-amber-400 transition">Visite Vidéo</a>
            <a href="#contact" className="hover:text-amber-400 transition">Contact</a>
          </div>

          <div className="hidden md:block">
            <a
              href="#proprietes"
              className="px-5 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-sm transition shadow-lg shadow-amber-500/20"
            >
              Explorer les biens
            </a>
          </div>

          {/* Bouton Menu Mobile */}
          <button
            onClick={() => setMenuOuvert(!menuOuvert)}
            className="md:hidden p-2 rounded-lg text-slate-200 hover:bg-white/10"
          >
            {menuOuvert ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Menu Mobile Déroulant */}
        {menuOuvert && (
          <div className="md:hidden bg-slate-900 border-t border-white/10 px-6 py-4 flex flex-col gap-4 text-sm font-medium">
            <a href="#accueil" onClick={() => setMenuOuvert(false)} className="hover:text-amber-400">Accueil</a>
            <a href="#proprietes" onClick={() => setMenuOuvert(false)} className="hover:text-amber-400">Acheter & Louer</a>
            <a href="#visite-video" onClick={() => setMenuOuvert(false)} className="hover:text-amber-400">Visite Vidéo</a>
            <a href="#contact" onClick={() => setMenuOuvert(false)} className="hover:text-amber-400">Contact</a>
          </div>
        )}
      </nav>

      {/* =================================================================== */}
      {/* HEADER AVEC VIDÉO EN ARRIÈRE-PLAN                                   */}
      {/* =================================================================== */}
      <header id="accueil" className="relative h-screen min-h-[650px] flex items-center justify-center overflow-hidden bg-slate-950">
        {/* Vidéo en arrière-plan */}
        <video
          autoPlay
          loop
          muted
          playsInline
          l
          className="absolute inset-0 w-full h-full object-cover opacity-55 scale-105"
        >
          <source src={MEDIAS.headerVideo} type="video/mp4" />
        </video>

        {/* Dégradé sombre pour lisibilité parfaite */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-slate-950/60" />

        {/* Contenu du Header */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white mt-12">
          <Reveal>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-amber-300 text-xs font-semibold uppercase tracking-widest">
              L'excellence immobilière à votre portée
            </span>
          </Reveal>

          <Reveal delay={150}>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-tight mb-6">
              Trouvez la maison qui incarne <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500">votre style de vie</span>.
            </h1>
          </Reveal>

          <Reveal delay={300}>
            <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
              Découvrez notre sélection exclusive de villas contemporaines, duplex et appartements de prestige disponibles à l'achat ou à la location.
            </p>
          </Reveal>

          <Reveal delay={450}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#proprietes"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-base transition flex items-center justify-center gap-2 shadow-xl shadow-amber-500/25"
              >
                Voir le catalogue <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="#visite-video"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/25 text-white font-semibold text-base transition flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 fill-amber-400 text-amber-400" /> Visite immersive
              </a>
            </div>
          </Reveal>
        </div>
      </header>

      {/* =================================================================== */}
      {/* SECTION PROPRIÉTÉS (ACHAT & LOCATION)                               */}
      {/* =================================================================== */}
      <section id="proprietes" className="max-w-7xl mx-auto px-6 py-24">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div>
              <span className="text-amber-600 font-bold text-sm uppercase tracking-wider">
                Catalogue Exclusif
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 mt-2">
                Nos Maisons à Louer & à Vendre
              </h2>
            </div>

            {/* Boutons de filtre */}
            <div className="inline-flex p-1.5 rounded-2xl bg-slate-200/80 self-start">
              {['Tout', 'Location', 'Vente'].map((categorie) => (
                <button
                  key={categorie}
                  onClick={() => setFiltre(categorie)}
                  className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                    filtre === categorie
                      ? 'bg-slate-900 text-white shadow-md'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {categorie === 'Tout' ? 'Tous les biens' : `À ${categorie === 'Location' ? 'Louer' : 'Vendre'}`}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Grille des maisons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {biensFiltres.map((maison, idx) => (
            <Reveal key={maison.id} delay={idx * 120}>
              <div className="group bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-2xl hover:shadow-slate-900/10 transition-all duration-500 flex flex-col">
                {/* Image avec zoom au survol */}
                <div className="relative h-72 sm:h-80 overflow-hidden bg-slate-200">
                  <img
                    src={maison.image}
                    onError={(e) => {
                      e.currentTarget.src = maison.fallback;
                    }}
                    alt={maison.titre}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span
                      className={`px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wide shadow ${
                        maison.type === 'Location'
                          ? 'bg-emerald-500 text-white'
                          : 'bg-amber-500 text-slate-950'
                      }`}
                    >
                      {maison.type === 'Location' ? 'À Louer' : 'À Vendre'}
                    </span>
                    <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-slate-950/75 text-white backdrop-blur-md">
                      {maison.badge}
                    </span>
                  </div>

                  {/* Prix sur l'image */}
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                    <div className="px-4 py-2 rounded-2xl bg-slate-950/85 backdrop-blur-md text-white">
                      <p className="text-xs text-slate-300">Tarif</p>
                      <p className="text-lg sm:text-xl font-extrabold text-amber-400">
                        {maison.prix}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Informations détaillées */}
                <div className="p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-slate-500 text-sm mb-2">
                      <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>{maison.localisation}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 group-hover:text-amber-600 transition">
                      {maison.titre}
                    </h3>
                  </div>

                  {/* Caractéristiques */}
                  <div className="grid grid-cols-3 gap-4 my-6 py-4 border-y border-slate-100 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <BedDouble className="w-5 h-5 text-slate-400" />
                      <span><strong>{maison.chambres}</strong> Chambres</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Bath className="w-5 h-5 text-slate-400" />
                      <span><strong>{maison.sallesDeBain}</strong> Douches</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Maximize className="w-5 h-5 text-slate-400" />
                      <span><strong>{maison.surface}</strong></span>
                    </div>
                  </div>

                  <button
                    onClick={() => setBienSelectionne(maison)}
                    className="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-amber-500 text-white hover:text-slate-950 font-bold text-sm transition-colors flex items-center justify-center gap-2"
                  >
                    Demander une visite <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* =================================================================== */}
      {/* SECTION VIDÉO IMMERSIVE & PRÉSENTATION                              */}
      {/* =================================================================== */}
      <section id="visite-video" className="bg-slate-950 text-white py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Colonne Texte */}
            <div className="lg:col-span-5">
              <Reveal>
                <span className="text-amber-400 font-bold text-sm uppercase tracking-wider">
                  Expérience Immersive
                </span>
                <h2 className="text-3xl sm:text-5xl font-extrabold mt-3 mb-6 leading-tight">
                  Visitez nos résidences comme si vous y étiez.
                </h2>
                <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                  Chaque propriété est rigoureusement sélectionnée pour son architecture, son emplacement stratégique et la qualité de ses finitions.
                </p>

                <ul className="space-y-4 mb-8 text-slate-300">
                  {[
                    'Quartiers sécurisés et accessibles 24h/24',
                    'Documents juridiques et titres fonciers vérifiés',
                    'Accompagnement personnalisé jusqu’à la remise des clés',
                  ].map((point, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            {/* Colonne Lecteur Vidéo */}
            <div className="lg:col-span-7">
              <Reveal delay={200}>
                <div className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl shadow-amber-500/10 bg-slate-900">
                  <video
                    controls
                    playsInline
                    poster="https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80"
                    className="w-full aspect-video object-cover"
                  >
                    <source src={MEDIAS.sectionVideo} type="video/mp4" />
                    Votre navigateur ne supporte pas la lecture vidéo.
                  </video>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* FOOTER COMPLET                                                      */}
      {/* =================================================================== */}
      <footer id="contact" className="bg-slate-900 text-slate-300 pt-20 pb-10 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 pb-16 border-b border-slate-800">
          {/* Colonne 1 : Marque */}
          <div>
            <div className="flex items-center gap-2.5 text-2xl font-extrabold text-white mb-4">
              <span className="p-2 rounded-xl bg-amber-500 text-slate-950">
                <Building2 className="w-6 h-6" />
              </span>
              <span>
                Prestige<span className="text-amber-400">Immo</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Votre partenaire de confiance pour l’achat, la vente et la location de biens immobiliers d’exception.
            </p>
          </div>

          {/* Colonne 2 : Navigation rapide */}
          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Navigation</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#accueil" className="hover:text-amber-400 transition">Accueil</a></li>
              <li><a href="#proprietes" className="hover:text-amber-400 transition">Maisons à louer</a></li>
              <li><a href="#proprietes" className="hover:text-amber-400 transition">Maisons à vendre</a></li>
              <li><a href="#visite-video" className="hover:text-amber-400 transition">Visites en vidéo</a></li>
            </ul>
          </div>

          {/* Colonne 3 : Contact */}
          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Nous contacter</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>Cocody Riviera, Abidjan, Côte d'Ivoire</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-amber-400" />
                <span>+225 07 00 00 00 00</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-amber-400" />
                <span>contact@prestige-immo.ci</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} PrestigeImmo. Tous droits réservés.</p>
          <p>Site Démo Immobilier — React & Tailwind CSS</p>
        </div>
      </footer>

      {/* =================================================================== */}
      {/* FENÊTRE MODALE DE RÉSERVATION DE VISITE                             */}
      {/* =================================================================== */}
      {bienSelectionne && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-7 shadow-2xl relative animate-fadeIn">
            <button
              onClick={() => setBienSelectionne(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
              {bienSelectionne.type}
            </span>
            <h3 className="text-2xl font-extrabold text-slate-900 mt-1 mb-2">
              {bienSelectionne.titre}
            </h3>
            <p className="text-sm text-slate-500 mb-6">
              {bienSelectionne.localisation} • <strong className="text-slate-900">{bienSelectionne.prix}</strong>
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert(`Demande envoyée pour : ${bienSelectionne.titre}`);
                setBienSelectionne(null);
              }}
              className="space-y-4"
            >
              <input
                type="text"
                required
                placeholder="Votre nom complet"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 text-sm"
              />
              <input
                type="tel"
                required
                placeholder="Votre numéro de téléphone"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 text-sm"
              />
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition"
              >
                Confirmer la demande de visite
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}