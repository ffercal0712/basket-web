function AvisoLegal() {
    return (
        <div className="legal-page">
            <div className="page-header">
                <p className="page-header-label">Información legal</p>
                <h1 className="page-header-title">Aviso legal</h1>
            </div>

            <div className="legal-content">
                <section className="legal-section">
                    <h2>1. Datos identificativos del titular</h2>
                    <p>
                        En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de
                        la Sociedad de la Información y Comercio Electrónico (LSSI-CE), se informa de los
                        datos identificativos del titular de este sitio web:
                    </p>
                    <ul>
                        <li><strong>Razón social:</strong> OKSAP SPAIN SL</li>
                        <li><strong>Domicilio:</strong> C/ Matías Lara Larita 24, Ático, 29640 Fuengirola, Málaga, España</li>
                        <li><strong>Teléfono:</strong> +34 662 12 93 25</li>
                        <li><strong>Correo electrónico:</strong> <a href="mailto:info@oksap.es">info@oksap.es</a></li>
                        <li><strong>Sitio web corporativo:</strong> <a href="https://oksap.es" target="_blank" rel="noopener noreferrer">oksap.es</a></li>
                        <li><strong>Inscripción:</strong> Registro Mercantil de Málaga, Tomo 6424, Libro 5332, Folio 97, Hoja MA178043</li>
                    </ul>
                </section>

                <section className="legal-section">
                    <h2>2. Objeto del sitio web</h2>
                    <p>
                        Este sitio web tiene como finalidad informar sobre el 2º Torneo de Veteranos
                        Fuengirola, organizado por OKSAP SPAIN SL en colaboración con el Ayuntamiento de
                        Fuengirola. Su contenido es meramente informativo: equipos participantes,
                        calendario de partidos, resultados, ubicación del evento e información logística.
                    </p>
                    <p>
                        El acceso y uso de este sitio web es gratuito y no requiere registro previo.
                    </p>
                </section>

                <section className="legal-section">
                    <h2>3. Declaración de responsabilidad</h2>
                    <p>
                        En OKSAP nos esforzamos por mantener el contenido de nuestros sitios web tan
                        actualizado y correcto como sea posible. Sin embargo, parte de la información
                        puede estar incompleta, ser inexacta o no estar actualizada. OKSAP no asume
                        responsabilidad alguna por las posibles inexactitudes u omisiones en la información.
                    </p>
                    <p>
                        Cualquier decisión que el usuario tome basándose en la información publicada en el
                        sitio web es bajo su propia responsabilidad. Ni OKSAP ni sus filiales asumen
                        responsabilidad alguna por las pérdidas o daños de cualquier tipo que puedan
                        derivarse del uso de este sitio web o de cualquier información contenida en él.
                    </p>
                    <p>
                        La información publicada en este sitio web no constituye una oferta vinculante
                        para sus visitantes. Las inexactitudes o deficiencias en el sitio web no dan
                        derecho a compensación económica alguna.
                    </p>
                </section>

                <section className="legal-section">
                    <h2>4. Propiedad intelectual e industrial</h2>
                    <p>
                        Todos los contenidos del sitio web (textos, imágenes, logotipos, diseños, código,
                        estructura) son propiedad de OKSAP SPAIN SL o de terceros que han autorizado su
                        uso, y están protegidos por la legislación vigente en materia de propiedad
                        intelectual e industrial.
                    </p>
                    <p>
                        Los escudos y nombres de los equipos participantes pertenecen a sus respectivos
                        propietarios y se utilizan con su autorización para la promoción del torneo.
                    </p>
                    <p>
                        Queda prohibida la reproducción, distribución, comunicación pública o
                        transformación de cualquier contenido sin autorización expresa del titular.
                    </p>
                </section>

                <section className="legal-section">
                    <h2>5. Enlaces a sitios de terceros</h2>
                    <p>
                        Este sitio web puede contener enlaces a otras páginas externas (Ayuntamiento de
                        Fuengirola, redes sociales, Google Maps, etc.) que escapan al control de OKSAP.
                        Publicamos estos enlaces para ayudar a nuestros visitantes a encontrar más
                        información dentro de áreas específicas. OKSAP no puede garantizar que la
                        información enlazada sea correcta, relevante, actual o completa, y no se
                        responsabiliza del contenido ni del funcionamiento de dichos sitios.
                    </p>
                    <p>
                        Las referencias a productos, procesos o servicios comerciales, o el uso de
                        nombres de empresas o personas jurídicas en este sitio web, tienen únicamente
                        fines informativos y no implican respaldo ni aprobación por parte de OKSAP.
                    </p>
                </section>

                <section className="legal-section">
                    <h2>6. Legislación y jurisdicción aplicable</h2>
                    <p>
                        Las presentes condiciones se rigen por la legislación española. Cualquier
                        controversia derivada del uso de este sitio web se someterá a los juzgados y
                        tribunales del domicilio del titular, salvo que la legislación aplicable
                        disponga lo contrario.
                    </p>
                </section>

                <p className="legal-update">Última actualización: mayo de 2026.</p>
            </div>
        </div>
    );
}

export default AvisoLegal;