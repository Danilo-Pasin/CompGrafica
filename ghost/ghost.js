import * as THREE from 'three';

export function createGhost(color = 0xff3b3b) {
  const ghost = new THREE.Group();
  const materialCorpo = new THREE.MeshStandardMaterial({ color });

  const raio = 0.4;
  const altura = 0.5;
  const raioPonta = 0.13;   

  const tronco = new THREE.Mesh(
    new THREE.CylinderGeometry(raio, raio, altura, 32),
    materialCorpo
  );
  tronco.position.y = altura / 2 + raioPonta;
  ghost.add(tronco);

  const cupula = new THREE.Mesh(
    new THREE.SphereGeometry(raio, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2),
    materialCorpo
  );
  cupula.position.y = altura + raioPonta;
  ghost.add(cupula);

  const materialBranco = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const materialPupila = new THREE.MeshStandardMaterial({ color: 0x1a3cff });

  for (const lado of [-1, 1]) {
    const olho = new THREE.Mesh(new THREE.SphereGeometry(0.09, 16, 16), materialBranco);
    olho.position.set(lado * 0.15, altura + raioPonta + 0.08, 0.33);
    ghost.add(olho);

    const pupila = new THREE.Mesh(new THREE.SphereGeometry(0.045, 16, 16), materialPupila);
    pupila.position.set(lado * 0.15, altura + raioPonta + 0.08, 0.40);
    ghost.add(pupila);
  }

  const pontas = 10;
  const saia = [];

  for (let i = 0; i < pontas; i++) {
    const angulo = (i / pontas) * Math.PI * 2;

    const ponta = new THREE.Mesh(
      new THREE.SphereGeometry(raioPonta, 16, 16),
      materialCorpo
    );
    ponta.position.set(
      (raio - raioPonta) * Math.cos(angulo),
      raioPonta,
      (raio - raioPonta) * Math.sin(angulo)
    );
    ponta.userData.y0 = raioPonta;   
    ghost.add(ponta);
    saia.push(ponta);
  }

  ghost.userData.saia = saia;

  return ghost;
}

export function animateGhost(ghost, t) {
  ghost.position.y = 0.1 + 0.05 * Math.sin(t * 3);   

  ghost.userData.saia.forEach((ponta, i) => {
    ponta.position.y = ponta.userData.y0 + 0.04 * Math.sin(t * 5 + i);
  });
}